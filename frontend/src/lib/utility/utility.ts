import { pb } from '$lib/pocketbase';
import type { RecordModel, ListResult } from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const dateFormat = (dateString: string) => {
	const date = new Date(dateString);
	const mese = date.toLocaleString('default', { month: 'short' });
	const anno = date.getFullYear();

	const result = `${mese.toLocaleLowerCase()} ${anno}`;
	return result;
};

export const fetchEpisode = async (id: string) => {
	const episode: RecordModel = await pb.collection('episodes').getOne(id);
	return episode;
};

export const fetchEpisodes_paginated = async (i_page: number) => {
	let episodes: ListResult<RecordModel> = {
		page: 1,
		perPage: 60,
		totalItems: 0,
		totalPages: 0,
		items: []
	};
	try {
		episodes = await pb.collection('episodes').getList(i_page, 60, {
			requestKey: 'page_' + i_page,
			skipTotal: true,
			sort: '-date',
			expand: 'show'
		});
	} catch (error) {
		console.log(error);
	}
	return episodes;
};

export const fetchRecord = async (id: string, collection: string) => {
	let record: RecordModel = {
		collectionId: '',
		collectionName: '',
		id: '',
		created: '',
		updated: ''
	};
	if (collection === 'nowplaying') {
		record = await pb.collection(collection).getOne(id, { expand: 'episode, episode.tags' });
	} else {
		record = await pb.collection(collection).getOne(id);
	}
	return record;
};

export const fetchAllRecords = async (
	collection: string,
	sort: string,
	expand: string,
	filter: string
) => {
	const result: RecordModel[] = await pb
		.collection(collection)
		.getFullList({ sort: sort, filter: filter, expand: expand });
	return result;
};

export const file_url = (id: string, filename: string, thumb: string) => {
	let url = '';
	if (filename !== '') {
		url = PUBLIC_POCKETBASE_URL + '/api/files/episodes/' + id + '/' + filename + thumb;
	}
	return url;
};

export const animateScroll = {
	getAbsoluteTop: function (element: HTMLElement) {
		let top = 0;
		while (element) {
			top += element.offsetTop || 0;
			element = element.offsetParent;
		}
		return top;
	},
	scrollTo: function ({ element, duration = 1000, offset = 0, container = '' }) {
		const containerElement: HTMLElement =
			container === 'body' ? document.documentElement : document.querySelector(container);
		const containerTop = this.getAbsoluteTop(containerElement);
		const start = containerElement.scrollTop;
		const target = this.getAbsoluteTop(element) - containerTop + offset;
		const distance = target - start;
		const startTime = performance.now();
		let nextStep;

		const easeInOutQuad = function (time: number) {
			time /= duration / 2;
			if (time < 1) return (distance / 2) * time * time + start;
			time--;
			return (-distance / 2) * (time * (time - 2) - 1) + start;
		};

		const scroll = (currentTime: number) => {
			const timeElapsed = currentTime - startTime;
			nextStep = easeInOutQuad(timeElapsed);
			containerElement.scrollTop = nextStep;
			if (timeElapsed < duration) {
				requestAnimationFrame(scroll);
			}
		};
		requestAnimationFrame(scroll);
	}
};

export const waitForElement = (selector: string) => {
	return new Promise((resolve) => {
		if (document.querySelector(selector)) {
			return resolve(document.querySelector(selector));
		}

		const observer = new MutationObserver(() => {
			if (document.querySelector(selector)) {
				resolve(document.querySelector(selector));
				observer.disconnect();
			}
		});

		observer.observe(document.body, {
			subtree: true,
			childList: true
		});
	});
};

export function transition(action: () => void) {
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	if (!document.startViewTransition) return;
	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-ignore
	return document.startViewTransition(action);
}

export const slugify = (...args: (string | number)[]): string => {
	const value = args.join(' ');

	return value
		.normalize('NFD') // split an accented letter in the base letter and the acent
		.replace(/[\u0300-\u036f]/g, '') // remove all previously split accents
		.toLowerCase()
		.trim()
		.replace(/[^a-z0-9 ]/g, '') // remove all chars not letters, numbers and spaces (to be replaced)
		.replace(/\s+/g, '-'); // separator
};
