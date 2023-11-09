import { pb } from '$lib/pocketbase';
import { Collections } from '$lib/pocketbase/types';
import type { Actions } from '@sveltejs/kit';

export const actions: Actions = {
	about: async ({ request }) => {
		try {
			const data = await request.formData();
			const about = data.get('about');
			const id = String(data.get('id')) || '';
			await pb.collection(Collections.Projects).update(id, { about });
			return { success: true };
		} catch (error) {
			console.log(error);
			return { success: false };
		}
	},
	impressum: async ({ request }) => {
		try {
			const data = await request.formData();
			const impressum = data.get('impressum');
			const id = String(data.get('id')) || '';
			await pb.collection(Collections.Projects).update(id, { impressum });
			return { success: true };
		} catch (error) {
			console.log(error);
			return { success: false };
		}
	}
};
