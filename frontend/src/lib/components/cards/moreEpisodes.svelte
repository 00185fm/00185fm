<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	export let related_episodes: RecordModel[] = [];
	import { selected_episode } from '$lib/utility/stores';
	$: related_episodes;
	import EpisodeCard from './episodeCard.svelte';
</script>

<div class="grid grid-cols-5 gap-4 px-20 pt-10">
	{#each related_episodes as episode, i}
		{#if episode.id !== $selected_episode?.id}
			{#if i < 4}
				<EpisodeCard {episode} />
			{/if}
		{/if}
	{/each}
	<div class="relative flex aspect-1 items-center justify-center bg-white">
		<p class="font-basteleur text-2xl">More...</p>
	</div>
</div>
