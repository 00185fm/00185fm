import { pb } from '$lib/pocketbase';
import { PUBLIC_NP_ID } from '$env/static/public';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async () => {
	const record = await pb
		.collection('nowplaying')
		.getOne(PUBLIC_NP_ID, { fields: 'title, artist, is_live' });
	const np = {
		title: record.title,
		artist: record.artist,
		is_live: record.is_live
	};
	return { np };
};
