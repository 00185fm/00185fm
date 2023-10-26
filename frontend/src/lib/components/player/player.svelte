<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { PUBLIC_NP_ID } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import Chip from '$lib/components/chip.svelte';
	import { fetchRecord, slugify } from '$lib/utility/utility';
	import Volume from './volume.svelte';
	import Playpause from './playpause/playpause.svelte';
	import Audio from './audio.svelte';
	export let init_np: RecordModel;

	// let player: HTMLAudioElement;

	let np: RecordModel = init_np;
	let episode: RecordModel = {
		collectionId: '',
		collectionName: '',
		id: '',
		created: '',
		updated: '',
		expand: {
			episode: {
				title: ''
			}
		}
	};

	onMount(async () => {
		episode = np.expand?.episode;
		pb.collection('nowplaying').subscribe(PUBLIC_NP_ID, async function ({ action, record }) {
			if (action === 'update') {
				np = await fetchRecord(PUBLIC_NP_ID, 'nowplaying');
				episode = np.expand?.episode;
			}
		});
	});
	onDestroy(() => {
		pb.collection('nowplaying').unsubscribe(PUBLIC_NP_ID);
	});
</script>

<div class="grid h-full grid-cols-4">
	<div class="col-span-3 flex items-center justify-around" class:text-red-500={np.is_live}>
		{#if episode.title !== undefined}
			<Playpause />
			<div>
				{#if np.is_live}
					<span class="text-3xl">{np.title}</span>
				{:else}
					<a class="text-3xl" href="/archive?e={slugify(episode.title)}"
						>{episode.title} - {episode.author}</a
					>
				{/if}
				<Audio />
			</div>
			<Volume />
		{:else}
			<div class="col-span-4 flex items-center justify-center text-center">
				<span class="text-3xl">Waiting for connection..</span>
			</div>
		{/if}
	</div>
	<div
		class="flex flex-wrap items-center justify-center gap-3 overflow-y-scroll border-l border-black px-10 py-4"
	>
		{#if episode.title !== undefined}
			{#if !np.is_live}
				{#if episode.expand?.tags}
					{#each episode.expand.tags as tag}
						<Chip text={tag.tag} />
					{/each}
				{:else}
					<p class="font-basteleur">{@html episode.description}</p>
				{/if}
			{/if}
		{/if}
	</div>

	<!-- <div class="col-span-4 flex items-center justify-center text-center">
			<span class="text-3xl">Waiting for connection..</span>
		</div> -->
</div>
