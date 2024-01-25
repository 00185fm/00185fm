import { removeLastSegment } from '$lib/client/utility';
import { updateScheduledItem } from '$lib/components/crud/schema';
import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params, locals, parent }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const episodes = (await parent()).episodes;
	const id = params.itemId;
	const scheduledItem: RecordModel = await pb
		.collection(Collections.ScheduledItems)
		.getOne(id, { expand: 'schedule' });

	return {
		episodes,
		updateForm: await superValidate(updateScheduledItem),
		scheduledItem
	};
};

export const actions: Actions = {
	updateScheduledItem: async ({ request, url }) => {
		const pathname = removeLastSegment(url.pathname);
		const data = await request.formData();
		const form = await superValidate(data, updateScheduledItem);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			data.delete('autocomplete');
			if (!form.data.episode) data.delete('episode');
			if (!form.data.date) data.delete('date');
			else {
				const datetime = form.data.date.toISOString();
				data.set('date', datetime);
			}
			await pb.collection(Collections.ScheduledItems).update(form.data.id, data);
		} catch (error) {
			console.log(error);
		}
		throw redirect(302, pathname);
	}
};
