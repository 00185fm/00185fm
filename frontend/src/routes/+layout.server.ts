import type { LayoutServerLoad } from './$types';
import { PUBLIC_NP_ID } from '$env/static/public';
import { fetchAllRecords, fetchRecord } from '$lib/utility/utility';
import type { RecordModel } from 'pocketbase';

export const load: LayoutServerLoad = async () => {
	const now: number = new Date().setHours(0, 0, 0, 0);
	const today: string = new Date(now).toISOString();
	const projects: RecordModel[] = await fetchAllRecords('projects');
	const schedules: RecordModel[] = await fetchAllRecords(
		'schedules',
		'date',
		'',
		`date >= "${today}"`
	);
	const init_np: RecordModel = await fetchRecord(PUBLIC_NP_ID, 'nowplaying');
	return { init_np, projects, schedules };
};
