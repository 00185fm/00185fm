<script lang="ts">
	import { queryParameters } from 'sveltekit-search-params';
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import EpisodeCard from '$lib/components/cards/episodeCard.svelte';
	import EpisodeModal from '$lib/components/modal/episodeModal.svelte';
	import Dates from '$lib/components/dates.svelte';
	import Tags from '$lib/components/tags.svelte';
	import type { RecordModel, ListResult } from 'pocketbase';
	import { filters, selected_episode, showModal } from '$lib/utility/stores';
	import {
		animateScroll,
		fetchEpisodes_paginated,
		slugify,
		waitForElement
	} from '$lib/utility/utility';
	export let data;
	const { tags, dates } = data;
	$: page_index = 1;

	let episodes: RecordModel[] = [];

	let newBatch: ListResult<RecordModel> = data.init_episodes;

	let hasMore = true;

	const all_params = queryParameters({
		e: true,
		t: true,
		d: true,
		s: true,
		q: true
	});

	onMount(async () => {
		episodes = [...newBatch.items];
	});

	let filtered_episodes: RecordModel[] = episodes;

	$: {
		if (browser && episodes.length > 0) {
			if ($filters.active) {
				if ($all_params.t || $all_params.d || $all_params.q) {
					let res_filter = episodes.filter((e) => $filters.episode_ids.includes(e.id));
					do {
						if (res_filter.length !== $filters.episode_ids.length) {
							loadMoreHandler().then(() => {
								res_filter = episodes.filter((e) => $filters.episode_ids.includes(e.id));
							});
						}
					} while (
						res_filter.length !== $filters.episode_ids.length &&
						newBatch.totalPages >= page_index
					);
					filtered_episodes = res_filter;
				}
			} else {
				filtered_episodes = episodes;
			}
		}
	}

	$: {
		if (browser && episodes.length > 0) {
			if ($all_params.e && $showModal === false) {
				do {
					$selected_episode = episodes.find((e: RecordModel) => slugify(e.title) === $all_params.e);
					if (!$selected_episode) {
						loadMoreHandler().then(() => {
							$selected_episode = episodes.find(
								(e: RecordModel) => slugify(e.title) === $all_params.e
							);
						});
					}
				} while (!$selected_episode && newBatch.totalPages >= page_index);
				if ($selected_episode) {
					$showModal = true;
					waitForElement(`#e_` + $selected_episode.id).then((element) => {
						animateScroll.scrollTo({
							element: element,
							duration: 750,
							container: '#episodes',
							offset: 0
						});
					});
				}
			} else if (!$all_params.e && $showModal === true) {
				$showModal = false;
			}
		}
	}

	async function loadMoreHandler() {
		if (newBatch.items.length < 60) {
			hasMore = false;
		} else {
			hasMore = true;
			page_index++;
			newBatch = await fetchEpisodes_paginated(page_index);
			episodes = [...episodes, ...newBatch.items];
		}
	}
</script>

<div class="flex h-full min-h-full flex-col items-center justify-center p-4 pt-4 lg:pl-40 lg:pr-48">
	<div class="grid grid-flow-row gap-5 overflow-hidden lg:flex lg:flex-1 lg:flex-row">
		<div
			id="episodes"
			class="no-scrollbar order-last grid grid-flow-row gap-6 overflow-y-scroll pb-4 font-myriad lg:order-first lg:grid-cols-2 xl:grid-cols-3"
		>
			{#if episodes.length > 0}
				{#if $filters.active}
					{#if filtered_episodes.length > 0}
						{#each filtered_episodes as episode (episode.id)}
							<EpisodeCard {episode} />
						{/each}
					{:else}
						<div class="flex w-full items-start justify-center p-4">
							<span class="animate-pulse text-4xl">No episodes matching your request</span>
						</div>
					{/if}
				{:else}
					{#each episodes as episode (episode.id)}
						<EpisodeCard {episode} />
					{/each}
					<InfiniteScroll threshold={50} {hasMore} on:loadMore={loadMoreHandler} />
				{/if}
			{:else}
				<div class="flex w-full items-start justify-center p-4">
					<span class="animate-pulse text-4xl">Loading episodes..</span>
				</div>
			{/if}
		</div>

		<!-- TAGS -->
		<Tags {tags} />

		<!-- DATES -->
		<Dates {dates} />
	</div>
</div>

{#if $showModal}
	<EpisodeModal />
{/if}
