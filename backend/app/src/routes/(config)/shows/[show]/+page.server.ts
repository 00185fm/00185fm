import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { error, fail, redirect, type Actions } from '@sveltejs/kit';
import { newEpisode, updateShow } from '$lib/components/crud/schema';
import { superValidate } from 'sveltekit-superforms/server';
import { slugify, serializeNonPOJOs } from '$lib/server/utility';
import type { PageServerLoad } from './$types';
import { PUBLIC_DEF_PLAYLIST_ID } from '$env/static/public';

export const load: PageServerLoad = async ({ locals, cookies }) => {
	try {
		if (!locals?.user) throw redirect(302, '/login');
		const cookiesParsed = JSON.parse(cookies.get('pb_auth') || '');
		const createForm = await superValidate(newEpisode);
		const updateForm = await superValidate(updateShow);
		return { createForm, updateForm, token: cookiesParsed.token };
	} catch (e) {
		throw error(404);
	}
};

export const actions: Actions = {
	create: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, newEpisode);
		console.log(form.data);
		let res;
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			const datetime = form.data.date.toISOString();
			const slug = form.data.show_slug + '/' + slugify(form.data.title);
			data.append('slug', slug);
			data.append('playlists', PUBLIC_DEF_PLAYLIST_ID);
			data.set('date', datetime);
			if (!form.data.public) data.set('public', 'false');
			res = await pb.collection(Collections.Episodes).create(data);
		} catch (error) {
			console.log(error);
		}
		return { created: serializeNonPOJOs(res || null), form };
	},
	update: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, updateShow);
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			await pb.collection(Collections.Shows).update(form.data.id, data);
		} catch (error) {
			console.log(error);
		}
	},
	delete: async ({ url }) => {
		try {
			const data = url.searchParams;
			const id = data.get('id') || '';
			await pb.collection(Collections.Shows).delete(id);
		} catch (error) {
			const data = {
				errors: error
			};
			return fail(400, data);
		}
		throw redirect(303, '/shows');
	}
};
