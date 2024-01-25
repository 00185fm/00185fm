import { file_url } from '$lib/client/utility.js';
import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { error } from '@sveltejs/kit';
import type { RecordModel } from 'pocketbase';

export const load = async ({ params }) => {
	try {
		let episodes: RecordModel[] = [];
		const show = structuredClone(
			await pb.collection(Collections.Shows).getFirstListItem(`slug="${params.show}"`)
		);
		const showId = show.id;
		const audioUrls: string[] = [];
		try {
			episodes = structuredClone(
				await pb.collection(Collections.Episodes).getFullList({
					filter: `show="${showId}"`,
					sort: '-date',
					expand: 'tags, playlists'
				})
			);
			for (let i = 0; i < episodes.length; i++) {
				const url = file_url(episodes[i].id, episodes[i].audio, '');
				if (url !== '') {
					audioUrls.push(url);
				}
			}
		} catch (error) {
			console.log(error);
		}
		return { show, episodes, audioUrls };
	} catch (e) {
		throw error(404);
	}
};
