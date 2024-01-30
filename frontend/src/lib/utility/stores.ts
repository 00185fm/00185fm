import type { RecordModel } from 'pocketbase';
import { writable, type Writable } from 'svelte/store';
import type { filter_type } from './types';

export const showModal = writable(false);
export const selected_episode: Writable<RecordModel | undefined> = writable();
export const np: Writable<RecordModel | undefined> = writable();
export const archive_episode: Writable<RecordModel | undefined> = writable();
export const playing_archive = writable(false);
export const filter: Writable<filter_type> = writable({ active: false, items: [] });
