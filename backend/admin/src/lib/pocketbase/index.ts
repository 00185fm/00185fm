import { PRIVATE_POCKETBASE_URL } from '$env/static/private';
import PocketBase from 'pocketbase';

export const pb = new PocketBase(PRIVATE_POCKETBASE_URL);
