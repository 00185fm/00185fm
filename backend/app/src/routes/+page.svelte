<script lang="ts">
	import PocketBase from 'pocketbase';
	import { PUBLIC_NP_ID, PUBLIC_POCKETBASE_URL } from '$env/static/public';
	import Nowplaying from '$lib/components/nowplaying.svelte';
	import Live from '$lib/components/live.svelte';
	import Github from '$lib/components/github.svelte';
	const pb = new PocketBase(PUBLIC_POCKETBASE_URL);
	import { onMount, onDestroy } from 'svelte';
	import type { ActionData } from './$types';
	export let form: ActionData;

	export let data;
	let { np } = data;
	onMount(async () => {
		pb.collection('nowplaying').subscribe(PUBLIC_NP_ID, function ({ action, record }) {
			if (action === 'update') {
				np.title = record.title;
				np.artist = record.artist;
				np.is_live = record.is_live;
				np.slug = record.slug;
			}
		});
	});
	onDestroy(() => {
		pb.collection('nowplaying').unsubscribe(PUBLIC_NP_ID);
	});
</script>

<div class="container mx-auto p-10 space-y-4">
	<Nowplaying {np} {form} />
	<Live livestream={data.livestream} />
	<Github />
</div>
