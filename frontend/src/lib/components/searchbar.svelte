<script lang="ts">
	import { onMount } from 'svelte';

	let img: HTMLImageElement;
	let width = 0;
	let height = 0;
	onMount(() => {
		width = img.width;
		height = img.height;
	});
</script>

<div class="relative h-12">
	<img bind:this={img} class="border-img" src="/img/search_box.svg" alt="Search Box" />
	<div class="flex h-full items-center justify-center pl-4">
		<img class="inline-block" src="/img/search_icon.svg" alt="Search Icon" />
		<input
			id="searchbox"
			name="searchbox"
			type="text"
			class="searchbox inline-block h-full max-w-44 pl-2 font-basteleur"
			placeholder="Search.."
		/>
	</div>
</div>

<style>
	.border-img {
		z-index: 0;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.searchbox {
		outline: none !important;
		position: relative;
		z-index: 20;
		background-color: transparent;
	}
</style>
