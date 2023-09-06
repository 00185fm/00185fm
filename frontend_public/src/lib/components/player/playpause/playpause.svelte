<script lang="ts">
	import { onMount } from 'svelte';
	import { player } from '../audio.svelte';
	import { playpause } from './playpause';
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
	<img src="/img/{icon}.png" alt="Play/Pause Player" />
</button>
