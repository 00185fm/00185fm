import type { RecordModel } from 'pocketbase';
import { writable, type Writable } from 'svelte/store';

export const showModal = writable(false);
export const selected_episode: Writable<RecordModel | undefined> = writable();
export const np: Writable<RecordModel | undefined> = writable();
export const archive_episode: Writable<RecordModel | undefined> = writable();
export const playing_archive = writable(false);
