<script lang="ts">
	import { onMount } from 'svelte';
	import { player } from '../audio.svelte';
	import { playpause } from './playpause';
	import PlayIcon from '$lib/icons/playIcon.svelte';
	import PauseIcon from '$lib/icons/pauseIcon.svelte';
	$: icon = 'play';
	onMount(() => {
		player.onplaying = () => {
			icon = 'pause';
		};
		player.onpause = () => {
			icon = 'play';
		};
		player.onended = () => {
			icon = 'play';
		};
	});
</script>

<button
	on:click={() => {
		playpause(player).then((i) => {
			icon = i;
		});
	}}
>
	{#if icon === 'play'}
		<PlayIcon size={70} />
	{:else}
		<PauseIcon size={70} />
	{/if}
</button>
