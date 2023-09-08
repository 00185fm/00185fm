import type { RecordModel } from 'pocketbase';
import { PUBLIC_POCKETBASE_URL } from '$env/static/public';

export const file_url = (id: string, filename: string, thumb: string) => {
	const url = PUBLIC_POCKETBASE_URL + '/api/files/episodes/' + id + '/' + filename + thumb;
	return url;
};

export const checkEmpty = (i: any): string[] => {
	const empty: string[] = [];
	for (const e in i) {
		if (i.hasOwnProperty(e)) {
			if (!i[e] || i[e] === '') {
				empty.push(e);
			}
		}
	}
	return empty;
};

export const dateFormat = (dateString: string) => {
	const date = new Date(dateString);
	const mese = date.toLocaleString('default', { month: 'short' });
	const anno = date.getFullYear();

	const result = `${mese.toLocaleLowerCase()} ${anno}`;
	return result;
};

export const tagsToString = (episode: RecordModel) => {
	let tags = '';
	if (episode.expand?.tags) {
		episode.expand.tags.map((tag: RecordModel) => (tags += tag.tag + ' '));
	}
	return tags;
};
export const playlistsToString = (episode: RecordModel) => {
	let playlists = '';
	if (episode.expand?.playlists) {
		episode.expand.playlists.map((playlist: RecordModel) => (playlists += playlist.title + ' '));
	}
	return playlists;
};

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

function playAudio(player: HTMLAudioElement, url: string) {
	player.src = url;
	player.play();
}

let currentUrlIndex = 0;
let oldUrls: string[] = [];
export function playAudioSequence(player: HTMLAudioElement, urls: string[]) {
	if (oldUrls !== urls) {
		oldUrls = urls;
		currentUrlIndex = 0;
	}
	player.onended = () => {
		currentUrlIndex++;
		if (currentUrlIndex < urls.length) {
			playAudio(player, urls[currentUrlIndex]);
		} else {
			player.src = urls[0];
			currentUrlIndex = 0;
		}
	};
}
