import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { RecordModel } from 'pocketbase';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	let schedules: RecordModel[] = [];
	let episodes: RecordModel[] | undefined = [];
	try {
		schedules = structuredClone(
			await pb.collection(Collections.Schedules).getFullList({ sort: 'date' })
		);

		const query = `public=False`;

		episodes = await pb.collection(Collections.Episodes).getFullList({
			filter: query,
			sort: 'date'
		});
	} catch (error) {
		console.log(error);
	}
	return { schedules, episodes };
};
