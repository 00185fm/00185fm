import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { RecordModel } from 'pocketbase';
export const load: PageServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const episodes: RecordModel[] = structuredClone(
		await pb.collection(Collections.Episodes).getFullList({ sort: '-date', expand: 'show' })
	);
	return { episodes };
};
