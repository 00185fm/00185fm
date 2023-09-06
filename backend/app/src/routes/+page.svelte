<script lang="ts">
	import { PUBLIC_NP_ID } from '$env/static/public';
	import Nowplaying from '$lib/components/nowplaying.svelte';
	import { pb } from '$lib/pocketbase';
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

<div class="container mx-auto p-10">
	<Nowplaying {np} {form} />
</div>
