import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import { redirect } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load: LayoutServerLoad = async ({ locals }) => {
	if (!locals?.user) throw redirect(302, '/login');
	try {
		const projects = structuredClone(await pb.collection(Collections.Projects).getFullList());
		const radio =
			structuredClone(
				await pb.collection(Collections.Projects).getFirstListItem('name="00185fm"')
			) || {};
		return { projects, radio };
	} catch (error) {
		console.log(error);
	}
};
