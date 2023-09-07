import { pb } from '$lib/pocketbase';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { PRIVATE_LIQUIDSOAP } from '$env/static/private';
import { PUBLIC_NP_ID } from '$env/static/public';

export const load: ServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const record = await pb
		.collection('nowplaying')
		.getOne(PUBLIC_NP_ID, { fields: 'title, artist, is_live, slug' });
	const np = {
		title: record.title,
		artist: record.artist,
		is_live: record.is_live,
		slug: record.slug
	};
	return { np, user: locals.user };
};

export const actions: Actions = {
	nextsong: async () => {
		try {
			const url = PRIVATE_LIQUIDSOAP + '/nextsong';
			const result = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'User-Agent': 'Frontend 00185fm'
				}
			});
			if (result.ok) {
				return {
					success: true
				};
			}
		} catch (error) {
			console.log(error);
		}
	}
};
