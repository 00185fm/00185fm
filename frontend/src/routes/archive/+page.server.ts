import type { PageServerLoad } from './$types';
import type { ListResult, RecordModel } from 'pocketbase';
import { fetchAllRecords, fetchEpisodes_paginated } from '$lib/utility/utility';
export const load: PageServerLoad = async () => {
	let dates: RecordModel[] = [];
	let tags: RecordModel[] = [];
	let init_episodes: ListResult<RecordModel> = {
		page: 1,
		perPage: 60,
		totalItems: 0,
		totalPages: 0,
		items: []
	};
	try {
		tags = await fetchAllRecords('tag_episodes', '-count');
		dates = await fetchAllRecords('date_episodes', '-year');
		init_episodes = structuredClone(await fetchEpisodes_paginated(1));
	} catch (error) {
		console.log(error);
	}
	return { init_episodes, tags, dates };
};
