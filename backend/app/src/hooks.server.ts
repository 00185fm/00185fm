import { pb } from '$lib/pocketbase';
import { redirect, type Handle } from '@sveltejs/kit';
import { PRIVATE_POCKETBASE_TOKEN } from '$env/static/private';

export const handle: Handle = async ({ event, resolve }) => {
	pb.beforeSend = function (url, options) {
		options.headers = Object.assign({}, options.headers, {
			Authorization: PRIVATE_POCKETBASE_TOKEN
		});

		return { url, options };
	};
	pb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');
	if (pb.authStore.isValid) {
		try {
			await pb.collection('users').authRefresh();
		} catch (_) {
			pb.authStore.clear();
		}
	}

	event.locals.pb = pb;
	event.locals.user = structuredClone(pb.authStore.model);

	// if NOT logged can't access to /account
	if (!event.url.pathname.startsWith('/login')) {
		if (!event.locals.user) {
			throw redirect(302, '/login');
		}
	}

	const response = await resolve(event);
	response.headers.set('set-cookie', pb.authStore.exportToCookie({ httpOnly: false }));

	return response;
};
