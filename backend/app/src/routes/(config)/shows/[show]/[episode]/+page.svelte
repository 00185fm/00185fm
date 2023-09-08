<script lang="ts">
	import UpdateEpisode from '$lib/components/crud/updateEpisode.svelte';
	import {
		getModalStore,
		type ModalSettings,
		type ModalComponent,
		AccordionItem,
		Accordion
	} from '@skeletonlabs/skeleton';
	import Delete from '$lib/components/crud/delete.svelte';
	import PlaylistsSelector from '$lib/components/crud/playlistsSelector.svelte';
	import TagsSelector from '$lib/components/crud/tagsSelector.svelte';
	import { dateFormat } from '$lib/client/utility';
	let tabSet: number = 0;
	const modalStore = getModalStore();
	export let data;
	$: episode = data.episode;
	$: playlists = data.playlists;
	$: tags = data.tags;
	$: episodePlaylists = episode.expand?.playlists || [];
	$: episodeTags = episode.expand?.tags || [];
	$: image = data.image;
	$: audio = data.audio;
	function deleteModal(): void {
		const c: ModalComponent = { ref: Delete };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Please confirm',
			body: 'Do you really want to delete this item?',
			meta: { action: '?/delete&id=' + episode.id + '&slug=' + episode.slug }
		};
		modalStore.trigger(modal);
	}

	let updateForm = false;
</script>

<div class="container mx-auto p-2 sm:p-10">
	<div class="sm:flex text-center sm:text-left sm:justify-between mb-2">
		<h2 class="h2 p-4">{episode.title} w/ {episode.author}</h2>
		<div class="btn-group sm:btn-group-vertical variant-ghost mt-auto mb-auto">
			<button on:click={() => ((updateForm = !updateForm), (tabSet = 0))}>Update</button>
			<button on:click={deleteModal} class="variant-filled-error">Delete</button>
		</div>
	</div>
	{#if updateForm}
		<UpdateEpisode
			bind:updateForm
			{episode}
			form={data.form}
			token={data.token}
			{tabSet}
			{image}
			{audio}
		/>
	{:else}
		<div class="sm:grid sm:grid-cols-2 gap-3">
			<div class="space-y-3 text-center sm:text-left">
				{#if episode.date}
					<p class="font-bold text-xl text-gray-400">
						{dateFormat(episode.date)}
					</p>
				{:else}
					<span class="inline-block">
						⛔️ Date is missing <button
							class="btn variant-ghost block sm:inline-block"
							on:click={() => {
								updateForm = true;
								tabSet = 0;
							}}>Go Update! ✨</button
						>
					</span>
				{/if}
				{#if episode.description}
					<div class="p-2">{@html episode.description}</div>
				{:else}
					<span class="inline-block">
						⛔️ Description is missing <button
							class="btn variant-ghost block sm:inline-block"
							on:click={() => {
								updateForm = true;
								tabSet = 0;
							}}>Go Update! ✨</button
						>
					</span>
				{/if}
				{#if episode.audio}
					<div>
						<audio class="w-full" preload="auto" controls src={audio} />
					</div>
				{:else}
					<span class="inline-block">
						<span> ⛔️ Audio is missing </span>
						<button
							class="btn variant-ghost block sm:inline-block"
							on:click={() => {
								updateForm = true;
								tabSet = 2;
							}}>Go Update! ✨</button
						>
					</span>
				{/if}
				{#if episode.image}
					<img src={image} alt="" />
				{:else}
					<span class="inline-block">
						⛔️ Image is missing <button
							class="btn variant-ghost block sm:inline-block"
							on:click={() => {
								updateForm = true;
								tabSet = 1;
							}}>Go Update! ✨</button
						>
					</span>
				{/if}
			</div>

			<div class="py-2 sm:py-10">
				<Accordion
					regionPanel="variant-ghost-tertiary"
					hover="variant-ghost-secondary hover:variant-ghost-primary"
				>
					<AccordionItem open>
						<svelte:fragment slot="summary">
							<p class="font-bold text-xl">Tags</p>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<p class="text-center">
								Write the tag you want to add and press 'Enter' or just select it from the list
							</p>
							<p class="text-error-600 text-center">Don't forget to save!</p>
							<TagsSelector allTags={tags} rawTags={episodeTags} episodeId={episode.id} />
						</svelte:fragment>
					</AccordionItem>
					<AccordionItem>
						<svelte:fragment slot="summary">
							<p class="font-bold text-xl">Playlists</p>
						</svelte:fragment>
						<svelte:fragment slot="content">
							<p class="text-center">
								Remove 'default' playlist if you want to hide this episode from shuffle.
							</p>
							<p class="text-error-600 text-center">Don't forget to save!</p>
							<PlaylistsSelector
								allPlaylists={playlists}
								rawPlaylists={episodePlaylists}
								episodeId={episode.id}
							/>
						</svelte:fragment>
					</AccordionItem>
				</Accordion>
			</div>
		</div>
	{/if}
</div>
