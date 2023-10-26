import type { PageServerLoad } from './$types';
import type { ListResult, RecordModel } from 'pocketbase';
import { fetchEpisodes_paginated } from '$lib/utility/utility';
export const load: PageServerLoad = async () => {
	let init_episodes: ListResult<RecordModel> = {
		page: 1,
		perPage: 60,
		totalItems: 0,
		totalPages: 0,
		items: []
	};
	try {
		init_episodes = structuredClone(await fetchEpisodes_paginated(1));
	} catch (error) {
		console.log(error);
	}
	return { init_episodes };
};
