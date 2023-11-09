import { updateProject } from '$lib/components/crud/schema';
import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { slugify } from '$lib/server/utility';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';
import { superValidate } from 'sveltekit-superforms/server';

export const load = async ({ params, locals, parent }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const projects = (await parent()).projects;
	const project: RecordModel | undefined = projects?.find(
		(i) => slugify(i.name) === params.project
	);

	if (!project) {
		throw redirect(302, '/projects');
	}
	const form = await superValidate(updateProject);
	return { project, form };
};

export const actions: Actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, updateProject);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await pb.collection(Collections.Projects).update(form.data.id, data);
		} catch (error) {
			console.log(error);
		}
		return { form };
	}
};
