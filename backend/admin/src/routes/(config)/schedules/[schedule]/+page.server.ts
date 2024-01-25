import { dateFormat } from '$lib/client/utility';
import { createScheduledItem, updateSchedule } from '$lib/components/crud/schema';
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
	const episodes: RecordModel[] = (await parent()).episodes;
	const scheduledItems: RecordModel[] =
		(await pb.collection(Collections.ScheduledItems).getFullList({
			sort: 'date',
			filter: `schedule="${schedule?.id}"`,
			expand: 'episode',
			fields: '*,expand.episode.title,expand.episode.slug,expand.episode.author,expand.episode.id'
		})) || [];
	if (!schedule) {
		throw redirect(302, '/schedules');
	}
	return {
		createForm: await superValidate(createScheduledItem),
		updateForm: await superValidate(updateSchedule),
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
	},
	updateSchedule: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, updateSchedule);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const datetime = form.data.date?.toISOString() || '';
			if (datetime !== '') data.set('date', datetime);
			else data.delete('date');
			if (!form.data.manual) data.set('manual', 'false');
			data.delete('editDate');
			await pb.collection(Collections.Schedules).update(form.data.id, data);
			return { form };
		} catch (error) {
			console.log(error);
		}
		throw redirect(302, '/schedules');
	},
	delete: async ({ url }) => {
		let id = '';
		try {
			const data = url.searchParams;
			id = data.get('id') || '';
			await pb.collection(Collections.Schedules).delete(id);
		} catch (error) {
			const data = {
				errors: error
			};
			return fail(400, data);
		}
		throw redirect(302, '/schedules');
	},
	deleteScheduledItem: async ({ url }) => {
		let id = '';
		const pathname = url.pathname;
		try {
			const data = url.searchParams;
			id = data.get('id') || '';
			await pb.collection(Collections.ScheduledItems).delete(id);
		} catch (error) {
			const data = {
				errors: error
			};
			return fail(400, data);
		}
		throw redirect(302, pathname);
	}
};
