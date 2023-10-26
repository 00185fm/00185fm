<script lang="ts">
	import { queryParameters } from 'sveltekit-search-params';
	import Chip from '$lib/components/chip.svelte';
	import InfiniteScroll from 'svelte-infinite-scroll';
	import EpisodeCard from '$lib/components/cards/episodeCard.svelte';
	import Modal from '$lib/components/modal/modal.svelte';
	import type { RecordModel, ListResult } from 'pocketbase';
	import { onMount } from 'svelte';
	import {
		animateScroll,
		fetchEpisodes_paginated,
		slugify,
		waitForElement
	} from '$lib/utility/utility.js';
	import { browser } from '$app/environment';
	export let data;
	let showModal = false;
	$: page_index = 1;
	let episodes: RecordModel[] = [];
	let selected_episode: RecordModel | undefined;
	let newBatch: ListResult<RecordModel> = data.init_episodes;

	let hasMore = true;

	const all_params = queryParameters({
		e: true
	});

	onMount(async () => {
		episodes = [...newBatch.items];
	});

	$: {
		if (browser && episodes.length > 0) {
			if ($all_params.e && showModal === false) {
				do {
					selected_episode = episodes.find((e: RecordModel) => slugify(e.title) === $all_params.e);
					if (!selected_episode) {
						loadMoreHandler().then(() => {
							selected_episode = episodes.find(
								(e: RecordModel) => slugify(e.title) === $all_params.e
							);
						});
					}
				} while (!selected_episode && newBatch.totalPages >= page_index);
				if (selected_episode) {
					showModal = true;
					waitForElement(`#e_` + selected_episode.id).then((element) => {
						animateScroll.scrollTo({
							element: element,
							duration: 750,
							container: '#episodes',
							offset: 0
						});
					});
				}
			} else if (!$all_params.e && showModal === true) {
				showModal = false;
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
	<!-- <pre>
		{JSON.stringify($all_params, null, 2)}
	</pre> -->
	<div class="grid grid-flow-row gap-5 overflow-hidden lg:flex lg:flex-1 lg:flex-row">
		<div
			id="episodes"
			class="font-myriad no-scrollbar order-last grid grid-flow-row gap-6 overflow-y-scroll pb-4 lg:order-first lg:grid-cols-2 xl:grid-cols-3"
		>
			{#each episodes as episode (episode.id)}
				<EpisodeCard {episode} {selected_episode} {showModal} />
			{/each}
			<InfiniteScroll threshold={50} {hasMore} on:loadMore={loadMoreHandler} />
		</div>

		<!-- TAGS -->
		<div class="no-scrollbar h-28 overflow-x-scroll p-4 lg:h-full lg:w-[50%] lg:overflow-y-scroll">
			{#each { length: 50 } as _, i}
				<Chip text={'acid_' + (i + 1)} padding="px-2 m-2 mt-1" c_class="uppercase text-xs" />
			{/each}
		</div>

		<!-- DATES -->
		<div
			class="no-scrollbar order-first overflow-x-scroll p-4 lg:order-last lg:w-[50%] lg:overflow-x-scroll"
		>
			<div class="grid w-max grid-cols-4 gap-8">
				{#each { length: 4 } as _, year}
					<div class="grid grid-flow-col gap-2.5 lg:grid-flow-row">
						<span class="font-basteleur text-stroke text-2xl">{'202' + (year + 1)}</span>
						{#each { length: 12 } as _, month}
							<Chip
								text={'jan' + (month + 1)}
								outline="outline-dashed outline-1 outline-black"
								padding="p-2 justify-center"
								size="w-fit"
								c_class="text-xl"
								bg_color="transparent"
								font="font-basteleur"
							/>
						{/each}
					</div>
				{/each}
			</div>
		</div>
	</div>
</div>

{#if showModal}
	<Modal bind:showModal episode={selected_episode} />
{/if}
