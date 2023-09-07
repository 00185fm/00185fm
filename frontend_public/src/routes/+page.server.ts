import type { Actions } from '@sveltejs/kit';
import { PRIVATE_LIQUIDSOAP } from '$env/static/private';

export const actions: Actions = {
	nextsong: async () => {
		try {
			const url = PRIVATE_LIQUIDSOAP + '/nextsong';
			const result = await fetch(url, {
				method: 'GET',
				headers: {
					Accept: 'application/json',
					'User-Agent': 'Frontend 00185fm'
				}
			});
			if (result.ok) console.log('Song Skipped!');
		} catch (error) {
			console.log(error);
		}
	}
};
