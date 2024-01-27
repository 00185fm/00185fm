<script lang="ts">
	export let text: string = '';
	export let url: string | undefined = undefined;
	export let event: boolean = false;
	export let c_class: string = '';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
</script>

{#if event}
	<a
		class="relative {c_class} group"
		on:click|preventDefault={() => {
			dispatch('subClick');
		}}
		href="/"
	>
		<img
			class="absolute inset-0 h-full w-full object-cover group-hover:shadow-black group-hover:drop-shadow-lg"
			src="/img/00185fm_button.png"
			alt="{text} Button"
		/>
		<span class="absolute inset-0 flex items-center justify-center p-2 font-basteleur text-lg"
			>{text}</span
		>
	</a>
{:else if url}
	<a class="relative {c_class} group" href={url} target="_blank">
		<img
			class="absolute inset-0 h-full w-full object-cover group-hover:shadow-black group-hover:drop-shadow-lg"
			src="/img/00185fm_button.png"
			alt="{text} Button"
		/>
		<span class="absolute inset-0 flex items-center justify-center p-2 font-basteleur text-lg"
			>{text}</span
		>
	</a>
{/if}

<style>
	a {
		min-width: 15rem;
		height: 4rem;
	}
	span {
		text-shadow: 3px 3px 7px #3d3d3d7b;
	}
</style>
