import type { Actions, PageServerLoad } from './$types';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate, setError } from 'sveltekit-superforms/server';
import { pb } from '$lib/pocketbase';
import { loginSchema } from './schema';
import { Collections } from '$lib/pocketbase/types';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals?.user) throw redirect(302, '/');
	const form = await superValidate(loginSchema);
	return { form };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, loginSchema);
		if (!form.valid) {
			return fail(400, { form });
		}

		try {
			await pb.collection(Collections.Users).authWithPassword(form.data.email, form.data.password);
		} catch (e) {
			console.log(e);
			return setError(form, 'email', 'Wrong Credentials');
		}

		throw redirect(302, '/');
	}
};
