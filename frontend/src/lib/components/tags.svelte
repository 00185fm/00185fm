<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import Chip from './chip.svelte';

	export let tags: RecordModel[];
</script>

<div class="no-scrollbar h-28 overflow-x-scroll p-4 lg:h-full lg:w-[50%] lg:overflow-y-scroll">
	{#each tags as tag}
		<Chip text={tag.tag} padding="px-2 m-2 mt-1" c_class="uppercase text-xs" />
	{/each}
</div>
