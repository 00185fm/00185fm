import type { RecordModel } from 'pocketbase';
import { writable, type Writable } from 'svelte/store';

export const showModal = writable(false);
export const selected_episode: Writable<RecordModel | undefined> = writable();
export const np_id = writable('');
