import { pb } from '$lib/pocketbase';
import { redirect, type Actions, type ServerLoad } from '@sveltejs/kit';
import { PRIVATE_LIQUIDSOAP, LIVE_MOUNTPOINT, LIVE_PASSWORD, LIVE_PORT } from '$env/static/private';
import { PUBLIC_NP_ID, PUBLIC_LIQ_URL } from '$env/static/public';

export const load: ServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const livestream = {
		url: PUBLIC_LIQ_URL,
		mount: '/' + LIVE_MOUNTPOINT,
		port: LIVE_PORT,
		password: LIVE_PASSWORD
	};
	const record = await pb
		.collection('nowplaying')
		.getOne(PUBLIC_NP_ID, { fields: 'title, artist, is_live, slug' });
	const np = {
		title: record.title,
		artist: record.artist,
		is_live: record.is_live,
		slug: record.slug
	};
	return { np, user: locals.user, livestream };
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
