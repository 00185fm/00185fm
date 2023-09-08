import { Collections } from '$lib/pocketbase/types';
import { redirect, type Actions, fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { updateEpisode } from '$lib/components/crud/schema';
import { pb } from '$lib/pocketbase';
import { slugify } from '$lib/server/utility';
import type { RecordModel } from 'pocketbase';

export const load = async ({ parent, params, locals, cookies }) => {
	if (!locals?.user) throw redirect(302, '/login');
	const cookiesParsed = JSON.parse(cookies.get('pb_auth'));
	const playlists = structuredClone(await pb.collection(Collections.Playlists).getFullList());
	const tags = structuredClone(await pb.collection(Collections.Tags).getFullList());
	const form = await superValidate(updateEpisode);
	const episodes = (await parent()).episodes;
	const episode: RecordModel = episodes.find((i) => i.slug.split('/')[1] === params.episode);
	const audio = pb.files.getUrl(episode, episode.audio);
	const image = pb.files.getUrl(episode, episode.image, { thumb: '1000x1000' });
	return { episode, form, token: cookiesParsed.token, playlists, tags, image, audio };
};

export const actions: Actions = {
	update: async ({ request }) => {
		const data = await request.formData();
		const form = await superValidate(data, updateEpisode);
		let slug: string = '/';
		if (!form.valid) {
			return fail(400, { form });
		}
		try {
			if (form.data.date !== undefined) {
				const datetime = form.data.date?.toISOString();
				data.set('date', datetime);
			}
			slug = form.data.slug.split('/')[0] + '/' + slugify(form.data.title);
			data.set('slug', slug);
			await pb.collection(Collections.Episodes).update(form.data.id, data);
			if (slug === form.data.slug) {
				return { form };
			}
		} catch (error) {
			console.log(error);
		}
		throw redirect(304, '/shows/' + slug.split('/')[0]);
	},
	delete: async ({ url }) => {
		let slug = '';
		let id = '';
		try {
			const data = url.searchParams;
			id = data.get('id') || '';
			slug = '/shows/' + data.get('slug')?.split('/')[0] || '/shows';
			await pb.collection(Collections.Episodes).delete(id);
		} catch (error) {
			const data = {
				errors: error
			};
			return fail(400, data);
		}
		throw redirect(303, slug);
	},
	playlists: async ({ request }) => {
		const data = await request.formData();
		const playlistsStrArr = data.getAll('chips');
		const episodeId: string = String(data.get('id')) || '';
		let playlists: string[] = [];
		try {
			if (playlistsStrArr.length > 0) {
				for (let i = 0; i < playlistsStrArr.length; i++) {
					const title = playlistsStrArr[i];
					const episode = await pb
						.collection('playlists')
						.getFirstListItem("title='" + title + "'");
					playlists.push(episode.id);
				}
			}
		} catch (error) {
			console.log(error);
		}
		if (playlists.length > 0) {
			try {
				const write = { playlists: playlists };
				await pb.collection('episodes').update(episodeId, write);
			} catch (error) {
				console.log(error);
			}
		}
	},
	tags: async ({ request }) => {
		const data = await request.formData();
		const tagsStrArr = data.getAll('chips');
		const episodeId: string = String(data.get('id')) || '';
		let tags: string[] = [];

		try {
			if (tagsStrArr.length > 0) {
				for (let i = 0; i < tagsStrArr.length; i++) {
					const newTag = tagsStrArr[i];
					try {
						const tag = await pb.collection('tags').getFirstListItem("tag='" + newTag + "'");
						tags.push(tag.id);
					} catch (error) {
						const tag = await pb.collection('tags').create({ tag: newTag });
						tags.push(tag.id);
					}
				}
			}
		} catch (error) {
			console.log(error);
		}
		try {
			let write = { tags: [''] };
			if (tags.length > 0) {
				write = { tags: tags };
			}
			await pb.collection('episodes').update(episodeId, write);
		} catch (error) {
			console.log(error);
		}
	}
};
