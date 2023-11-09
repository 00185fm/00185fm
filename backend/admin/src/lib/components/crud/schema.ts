import { z } from 'zod';

export const newEpisode = z.object({
	title: z.string(),
	author: z.string(),
	// audio: z.any(),
	// image: z.any(),
	date: z.date(),
	tracklist: z.any().optional(),
	credits: z.any().optional(),
	public: z.boolean(),
	description: z.any().optional(),
	show: z.string(),
	show_slug: z.string()
});
export const updateEpisode = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	tracklist: z.any().optional(),
	credits: z.any().optional(),
	public: z.boolean(),
	slug: z.string(),
	date: z.date().optional(),
	description: z.any().optional()
});

export const newShow = z.object({
	title: z.string(),
	author: z.string(),
	description: z.string().optional()
});

export const updateShow = z.object({
	id: z.string(),
	title: z.string(),
	author: z.string(),
	description: z.any().optional()
});
export const updateProject = z.object({
	id: z.string(),
	about: z.string().optional(),
	bandcamp: z.string().optional(),
	email: z.string().optional(),
	facebook: z.string().optional(),
	impressum: z.string().optional(),
	instagram: z.string().optional(),
	name: z.string().optional(),
	support: z.string().optional(),
	telegram: z.string().optional(),
	website: z.string().optional(),
	youtube: z.string().optional()
});

export const createSchedule = z.object({
	date: z.date(),
	info: z.string().optional(),
	manual: z.boolean().default(false).optional()
});
export const updateSchedule = z.object({
	id: z.string(),
	date: z.date().optional(),
	info: z.string().optional(),
	manual: z.boolean().optional()
});

export const createScheduledItem = z.object({
	artist: z.string(),
	date: z.date(),
	title: z.string(),
	schedule: z.string(),
	episode: z.string().optional()
});
export const updateScheduledItem = z.object({
	id: z.string(),
	artist: z.string().optional(),
	date: z.date().optional(),
	title: z.string().optional(),
	schedule: z.string(),
	episode: z.string().optional()
});
