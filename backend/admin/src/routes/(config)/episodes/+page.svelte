<script lang="ts">
	import GalleryThumbnails from '$lib/icons/gallery-thumbnails.svelte';
	import AlignJustify from '$lib/icons/align-justify.svelte';

	import EpisodeCard from '$lib/components/cards/episodeCard.svelte';
	import { RadioGroup, RadioItem, SlideToggle } from '@skeletonlabs/skeleton';
	import { checkEmpty, playlistsToString, tagsToString } from '$lib/client/utility';
	export let data;
	const { episodes } = data;
	let showIncomplete = false;
	let cardDimension = 0;

	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';

	const searchEpisodes = episodes?.map((episode) => ({
		...episode,
		searchTerms: `${episode.title} ${episode.author} ${tagsToString(episode)} ${playlistsToString(
			episode
		)} ${episode.description} ${episode.slug}`
	}));

	const searchStore = createSearchStore(searchEpisodes);

	const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="container mx-auto p-2 sm:p-10">
	{#if episodes.length > 0}
		<div class="text-center sm:text-left sm:flex sm:justify-between">
			<h2 class="h2 p-5">Episodes</h2>
			<input
				class="input sm:mx-10 sm:my-5"
				type="search"
				placeholder="Search..."
				bind:value={$searchStore.search}
			/>
			<div class="p-5 sm:float-right">
				<RadioGroup
					class="w-full"
					active="variant-ghost-primary"
					hover="hover:variant-soft-primary"
					padding="px-2 py-0"
				>
					<span>View</span>
					<RadioItem bind:group={cardDimension} name="dimension" value={0}
						><AlignJustify /></RadioItem
					>
					<RadioItem bind:group={cardDimension} name="dimension" value={1}
						><GalleryThumbnails /></RadioItem
					>
				</RadioGroup>
				<div class="pt-2 w-full">
					<span class="align-top">⛔️ Only</span>
					<SlideToggle size="sm" name="incomplete" bind:checked={showIncomplete} />
				</div>
			</div>
			<!-- <SlideToggle class="p-8" size="sm" name="incomplete" bind:checked={showIncomplete}
				>Incomplete</SlideToggle
			> -->
		</div>
		<div class="grid grid-rows-1 sm:grid-cols-5 gap-2">
			{#each $searchStore.filtered as episode}
				{#if showIncomplete}
					{#if checkEmpty(episode).length > 0}
						<EpisodeCard {episode} {cardDimension} />
					{/if}
				{:else}
					<EpisodeCard {episode} {cardDimension} />
				{/if}
			{/each}
		</div>
	{:else}
		<h2 class="h2 p-5">Episodes</h2>
		<p>No episode found</p>
	{/if}
</div>
