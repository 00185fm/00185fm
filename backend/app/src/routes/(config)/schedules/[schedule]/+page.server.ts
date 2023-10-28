import { dateFormat } from '$lib/client/utility';
import { createScheduledItem } from '$lib/components/crud/schema';
import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { slugify } from '$lib/server/utility';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params, locals, parent }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const schedules = (await parent()).schedules;
	const schedule: RecordModel | undefined = schedules?.find(
		(i: RecordModel) => slugify(dateFormat(i.date, true)) === params.schedule
	);
	const query = `date >="${new Date(Date.now()).toISOString()}"`;
	const episodes: RecordModel[] | undefined = await pb.collection('episodes').getFullList({
		filter: query,
		sort: 'date'
	});
	const scheduledItems: RecordModel[] =
		(await pb
			.collection(Collections.ScheduledItems)
			.getFullList({ sort: 'date', filter: `schedule="${schedule?.id}"` })) || [];

	if (!schedule) {
		throw redirect(302, '/schedules');
	}
	return {
		createForm: await superValidate(createScheduledItem),
		schedule,
		episodes,
		scheduledItems
	};
};
export const actions: Actions = {
	createScheduledItem: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, createScheduledItem);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const datetime = form.data.date.toISOString();
			data.set('date', datetime);
			data.delete('autocomplete');
			if (!form.data.episode) data.delete('episode');
			await pb.collection(Collections.ScheduledItems).create(data);
		} catch (error) {
			console.log(error);
		}
		return { form };
	}
};
