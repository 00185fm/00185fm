import type { LayoutServerLoad } from './$types';
import { PUBLIC_NP_ID } from '$env/static/public';
import { fetchRecord } from '$lib/utility/utility';
import type { RecordModel } from 'pocketbase';

export const load: LayoutServerLoad = async () => {
	const init_np: RecordModel = await fetchRecord(PUBLIC_NP_ID, 'nowplaying');
	return { init_np };
};
