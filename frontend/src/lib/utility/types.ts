import type { RecordModel } from 'pocketbase';

export type all_schedules = {
	info: string | undefined;
	date: string;
	scheduled_items: RecordModel[];
};
