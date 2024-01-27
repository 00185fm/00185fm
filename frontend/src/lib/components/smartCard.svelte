<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import Chip from './chip.svelte';

	export let episode: RecordModel;
	export let np: RecordModel;
</script>

<div
	class="no-scrollbar flex flex-wrap items-center justify-center gap-3 overflow-y-scroll border-l border-black px-10 py-4"
>
	{#if !np.is_live}
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
