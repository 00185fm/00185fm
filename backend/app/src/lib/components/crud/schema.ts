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
