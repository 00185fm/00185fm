<script lang="ts">
	import { slugify } from '$lib/utility/utility';
	import type { RecordModel } from 'pocketbase';

	export let np: RecordModel;
	export let episode: RecordModel;
</script>

<div class="col-span-7 flex h-full w-full items-center justify-center border-r border-black">
	{#if np.is_live}
		<span class="text-3xl">{np.title}</span>
	{:else if episode.title}
		<a
			href="/archive?e={slugify(episode.title)}"
			class="flex w-full items-center justify-around px-4"
		>
			<span class="text-2xl">{episode.title}</span>
			<hr class="w-24 border-l border-black align-middle" />
			<span class="text-2xl">{episode.author}</span>
		</a>
	{:else}
		<div class="flex h-full w-full items-center justify-center">
			<span class="text-3xl">Waiting for connection..</span>
		</div>
	{/if}
</div>
