<script lang="ts">
	import { archive_episode, np, playing_archive } from '$lib/utility/stores';
	import Chip from './chip.svelte';
	$: episode = $np?.expand?.episode;
	$: {
		if ($playing_archive) {
			episode = $archive_episode;
		} else {
			episode = $np?.expand?.episode;
		}
	}
</script>

<div
	class="no-scrollbar hidden flex-wrap items-center justify-center gap-3 overflow-y-scroll border-l border-black px-10 py-4 lg:flex"
>
	{#if !$np?.is_live}
		{#if episode}
			{#if episode.expand?.tags}
				{#each episode.expand.tags as tag}
					<Chip text={tag.tag} />
				{/each}
			{:else}
				<p class="font-basteleur">{@html episode.description}</p>
			{/if}
		{/if}
	{:else}
		<p class="animate-pulse font-basteleur text-red-500">Live</p>
	{/if}
</div>
