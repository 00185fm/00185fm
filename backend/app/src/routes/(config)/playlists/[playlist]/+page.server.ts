import { pb } from '$lib/pocketbase';
import { Collections, type EpisodesRecord } from '$lib/pocketbase/types';
import { redirect, type Actions } from '@sveltejs/kit';

export const load = async ({ params, locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const playlist = structuredClone(
		await pb.collection(Collections.Playlists).getFirstListItem('title="' + params.playlist + '"')
	);
	const episodes: EpisodesRecord[] = structuredClone(
		await pb
			.collection(Collections.Episodes)
			.getFullList({ filter: "playlists ~'" + playlist.id + "'" })
	);
	return { playlist, episodes };
};

export const actions: Actions = {
	delete: async ({ url }) => {
		try {
			const data = url.searchParams;
			const e_id = data.get('e_id') || '';
			const p_id = data.get('p_id') || '';
			await pb.collection(Collections.Episodes).update(e_id, {
				'playlists-': p_id
			});
		} catch (error) {
			console.log(error);
		}
	}
};
