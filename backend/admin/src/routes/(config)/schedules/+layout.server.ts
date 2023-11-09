import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import type { RecordModel } from 'pocketbase';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	let schedules: RecordModel[] = [];
	try {
		schedules = structuredClone(
			await pb.collection(Collections.Schedules).getFullList({ sort: 'date' })
		);
	} catch (error) {
		console.log(error);
	}
	return { schedules };
};
