<script lang="ts">
	import UpdateShow from '$lib/components/crud/updateShow.svelte';
	import DeleteDenyCard from '$lib/components/cards/deleteDenyCard.svelte';
	import CreateEpisode from '$lib/components/crud/createEpisode.svelte';
	import EpisodeCard from '$lib/components/cards/episodeCard.svelte';
	export let data;
	let tabSet: number = 0;
	let createForm = false;
	let updateForm = false;
	$: episodes = data.episodes;
	$: show = data.show;
	$: image = data.image;
	const { token } = data;
	let cardDimension: number = 0;
	import AlignJustify from '$lib/icons/align-justify.svelte';
	import GalleryThumbnails from '$lib/icons/gallery-thumbnails.svelte';
	import Delete from '$lib/components/crud/delete.svelte';
	import {
		RadioGroup,
		RadioItem,
		SlideToggle,
		type ModalComponent,
		type ModalSettings,
		getModalStore
	} from '@skeletonlabs/skeleton';
	import {
		checkEmpty,
		playAudioSequence,
		playlistsToString,
		tagsToString
	} from '$lib/client/utility';
	let showIncomplete = false;
	const modalStore = getModalStore();

	function deleteModal(): void {
		const c: ModalComponent = { ref: Delete };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			meta: { action: '?/delete&id=' + show.id + '&slug=' + show.slug }
		};
		modalStore.trigger(modal);
	}

	import { createSearchStore, searchHandler, type SearchStoreModel } from '$lib/stores/search';
	import { onDestroy, onMount } from 'svelte';
	import type { RecordModel } from 'pocketbase';
	let searchEpisodes: RecordModel[];
	let searchStore: any;
	let unsubscribe: any;
	let showPlayer: HTMLAudioElement;
	onMount(() => {
		if (episodes.length > 0) {
			showPlayer.onplay = () => {
				playAudioSequence(showPlayer, data.audioUrls);
			};
		}
	});
	$: {
		searchEpisodes = episodes?.map((episode: RecordModel) => ({
			...episode,
			searchTerms: `${episode.title} ${episode.author} ${tagsToString(episode)} ${playlistsToString(
				episode
			)} ${episode.description} ${episode.slug}`
		}));

		searchStore = createSearchStore(searchEpisodes);

		unsubscribe = searchStore.subscribe((model: SearchStoreModel<Record<PropertyKey, any>>) =>
			searchHandler(model)
		);
	}

	onDestroy(() => {
		unsubscribe();
	});

	let lock_delete = false;
</script>

<div class="container mx-auto p-2 sm:p-10">
	<div class="sm:flex sm:justify-between text-center sm:text-left">
		<h2 class="h2 p-4">{show.title} w/ {show.author}</h2>
		<div class="btn-group sm:btn-group-vertical variant-ghost mt-auto mb-auto">
			<button
				class="variant-ghost"
				on:click={() => ((createForm = !createForm), (updateForm = false))}>Create</button
			>
			<button
				class="variant-ghost-secondary"
				on:click={() => ((updateForm = !updateForm), (createForm = false))}>Update</button
			>
			<button
				on:click={() => {
					if (episodes.length > 0) {
						lock_delete = true;
					} else {
						lock_delete = false;
						deleteModal();
					}
				}}
				class="variant-filled-error">Delete</button
			>
		</div>
	</div>

	<div class="p-5">
		{#if show.image}
			<img class="w-full max-h-40 object-cover object-left-top" src={image} alt="" />
		{:else}
			<span class="flex justify-center lg:justify-start items-center gap-1">
				⛔️ Image is missing <button
					class="btn sm:btn-sm sm:px-3 variant-ghost block sm:inline-block"
					on:click={() => {
						updateForm = true;
						tabSet = 1;
					}}>Go Update! ✨</button
				>
			</span>
		{/if}
	</div>

	{#if lock_delete}
		<DeleteDenyCard bind:lock_delete />
	{/if}
	<p class="p-6 text-justify">{@html show.description}</p>

	{#if createForm}
		<CreateEpisode {data} bind:createForm />
	{:else if updateForm}
		<UpdateShow {image} {token} bind:updateForm {show} bind:tabSet form={data.updateForm} />
	{/if}
	{#if episodes.length > 0}
		<div class="my-2">
			<h3 class="h3 text-center sm:text-left">Play all episodes from this show</h3>
			<audio class="w-full" bind:this={showPlayer} src={data.audioUrls[0]} controls />
		</div>
		<input
			class="input my-7"
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
				<RadioItem bind:group={cardDimension} name="dimension" value={0}><AlignJustify /></RadioItem
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
		{#if cardDimension === 0}
			<div class="grid grid-flow-row gap-2">
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
			<div class="grid sm:grid-flow-row lg:grid-cols-4 gap-2">
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
		{/if}
	{:else}
		<p>No episode found</p>
	{/if}
</div>
