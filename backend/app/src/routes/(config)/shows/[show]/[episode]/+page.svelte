<script lang="ts">
	import { pb } from '$lib/pocketbase';
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

	$: image = pb.files.getUrl(episode, episode.image, { thumb: '1000x1000' });
	$: audio = pb.files.getUrl(episode, episode.audio);
</script>

<div class="container mx-auto p-10">
	<div class="flex justify-between mb-2">
		<h2 class="h2 p-5">{episode.title} w/ {episode.author}</h2>
		<div class="btn-group-vertical variant-ghost mt-auto mb-auto">
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
		<div class="grid grid-cols-2 gap-3">
			<div class="space-y-3">
				{#if episode.date}
					<p class="font-bold text-xl text-gray-400">
						{dateFormat(episode.date)}
					</p>
				{:else}
					<p>
						⛔️ Date is missing <button
							class="btn variant-ghost"
							on:click={() => {
								updateForm = true;
								tabSet = 0;
							}}>Go Update! ✨</button
						>
					</p>
				{/if}
				{#if episode.description}
					<div class="p-2">{@html episode.description}</div>
				{:else}
					<p>
						⛔️ Description is missing <button
							class="btn variant-ghost"
							on:click={() => {
								updateForm = true;
								tabSet = 0;
							}}>Go Update! ✨</button
						>
					</p>
				{/if}
				{#if episode.audio}
					<audio preload="auto" controls src={audio} />
				{:else}
					<p>
						⛔️ Audio is missing <button
							class="btn variant-ghost"
							on:click={() => {
								updateForm = true;
								tabSet = 2;
							}}>Go Update! ✨</button
						>
					</p>
				{/if}
				{#if episode.image}
					<img src={image} alt="" />
				{:else}
					<p>
						⛔️ Image is missing <button
							class="btn variant-ghost"
							on:click={() => {
								updateForm = true;
								tabSet = 1;
							}}>Go Update! ✨</button
						>
					</p>
				{/if}
			</div>

			<div class="py-10">
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
