<script lang="ts">
	// Player
	import { PUBLIC_NP_ID } from '$env/static/public';
	import Volume from './volume.svelte';
	import Playpause from './playpause/playpause.svelte';
	import Audio from './audio.svelte';

	import { pb } from '$lib/pocketbase';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { onMount, onDestroy } from 'svelte';

	export let initNP;

	let np = {
		title: initNP.title,
		artist: initNP.artist,
		is_live: initNP.is_live
	};
	onMount(async () => {
		pb.collection('nowplaying').subscribe(PUBLIC_NP_ID, function ({ action, record }) {
			if (action === 'update') {
				np.title = record.title;
				np.artist = record.artist;
				np.is_live = record.is_live;
			}
		});
	});
	onDestroy(() => {
		pb.collection('nowplaying').unsubscribe(PUBLIC_NP_ID);
	});
</script>

<AppBar background="bg-transparent">
	<svelte:fragment slot="lead">
		<Playpause />
	</svelte:fragment>

	<!-- METADATA -->
	<div id="metadata">
		{#if np.is_live}
			<span style="color: red;">LIVE!</span>
		{/if}
		<p>{np.title}</p>
		<p>{np.artist}</p>
	</div>
	<!---->

	<svelte:fragment slot="trail">
		<Volume />
	</svelte:fragment>
	<Audio />
</AppBar>
