<script lang="ts">
	import { playlistsToString, tagsToString } from '$lib/client/utility.js';
	import DeleteChip from '$lib/components/cards/deleteChip.svelte';
	export let data;
	$: playlist = data.playlist;
	$: episodes = data.episodes;

	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import type { RecordModel } from 'pocketbase';
	import { onDestroy } from 'svelte';
	let searchEpisodes: RecordModel[];
	let searchStore;
	let unsubscribe: any;

	$: {
		searchEpisodes = episodes.map((episode: RecordModel) => ({
			...episode,
			searchTerms: `${episode.title} ${episode.author} ${tagsToString(episode)} ${playlistsToString(
				episode
			)} ${episode.slug}`
		}));
		searchStore = createSearchStore(searchEpisodes);
		unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	}

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="container mx-auto p-2 sm:p-10">
	<div class="text-center sm:flex sm:justify-between">
		<h2 class="h2 p-4">{playlist?.title}</h2>
		<input
			class="input sm:mx-10 sm:my-5"
			type="search"
			placeholder="Search..."
			bind:value={$searchStore.search}
		/>
	</div>
	{#if episodes.length > 0}
		<div class="p-4 text-center">
			<span class="text-red-500">⚠️</span>
			<span
				>By clicking on the ' 𝗫 ' you will delete the episode from this playlist. Please be careful</span
			>
			<span class="text-red-500">⚠️</span>
		</div>
		<div class="text-center">
			{#each $searchStore.filtered as e}
				<DeleteChip
					action={'?/delete&e_id=' + e.id + '&p_id=' + playlist.id}
					submit={e?.title}
					class_str={'chip variant-ghost-tertiary hover:variant-ghost-primary p-2 m-1'}
				/>
			{/each}
		</div>
	{:else}
		<div class="p-4 text-center">
			<span class="text-red-500">⚠️</span>
			<span>No episode found. Go to episode's page to add it to this playlist</span>
			<span class="text-red-500">⚠️</span>
		</div>
	{/if}
</div>
