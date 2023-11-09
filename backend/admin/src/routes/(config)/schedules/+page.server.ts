import { createSchedule } from '$lib/components/crud/schema';
import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { type Actions, fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');

	return { createForm: await superValidate(createSchedule) };
};

export const actions: Actions = {
	createSchedule: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, createSchedule);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const datetime = form.data.date.toISOString();
			data.set('date', datetime);
			if (!form.data.manual) data.set('manual', 'false');
			await pb.collection(Collections.Schedules).create(data);
		} catch (error) {
			console.log(error);
		}
		return { form };
	}
};
