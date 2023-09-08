<script lang="ts">
	export let gistUrl: string = '';

	import { onMount } from 'svelte';

	let frame: HTMLIFrameElement;
	onMount(() => {
		frame.srcdoc = `<script src='${gistUrl}'><${''}/script>`;
	});
</script>

<div class="w-full h-full">
	<iframe class="w-full h-96" src="about:blank" bind:this={frame} title="Todo" />
</div>
