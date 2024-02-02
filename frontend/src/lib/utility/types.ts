import type { RecordModel } from 'pocketbase';

export type all_schedules = {
	info: string | undefined;
	date: string;
	scheduled_items: RecordModel[];
};

export type tag_filter_type = {
	tag: string;
	episodes: string[];
	active: boolean;
};

export type filters_type = {
	active: boolean;
	episode_ids: string[];
};
