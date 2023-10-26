<script lang="ts">
	import { fly } from 'svelte/transition';
	export let width: number = 150;
	export let open: boolean = false;
	export let content: string =
		'live showz ALOOOOO SDIOSIO IDOISAOI OISODI OSIDO live showz ALOOOOO SDIOSIO IDOISAOI OISODI OSIDO';
</script>

<button on:click={() => (open = !open)} class="fixed right-0 z-10 hidden h-full lg:block">
	<div class:schedule={open} class="flex h-[600px] items-center justify-start rounded-3xl">
		<span class="font-basteleur -rotate-90 text-3xl">SCHEDULE</span>
		{#if open}
			<div
				bind:clientWidth={width}
				transition:fly={{ x: width }}
				class="no-scrollbar max-h-full overflow-y-scroll pr-20"
			>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
				<p>{content}</p>
			</div>
		{/if}
	</div>
</button>

<style>
	.schedule {
		background-color: rgba(245, 245, 245, 0.954);
		-webkit-box-shadow: -23px 0px 50px 26px whitesmoke;
		box-shadow: -23px 0px 50px 26px whitesmoke;
	}
</style>
