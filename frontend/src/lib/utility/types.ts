import type { RecordModel } from 'pocketbase';

export type all_schedules = {
	info: string | undefined;
	date: string;
	scheduled_items: RecordModel[];
};

export type filter_type = {
	active: boolean;
	items: string[];
};
