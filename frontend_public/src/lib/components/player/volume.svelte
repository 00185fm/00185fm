<script lang="ts">
	import { onMount } from 'svelte';
	import { player } from './audio.svelte';
	let volume = 100;
	let volSlider: HTMLInputElement;
	onMount(() => {
		volSlider.oninput = () => {
			player.volume = volume / 100;
		};
	});
</script>

<button>
	<img src="/img/mute.png" alt="Mute Player" />
</button>
<input class="slider" type="range" bind:this={volSlider} bind:value={volume} min="0" max="100" />

<style>
	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 2px;
		background: #000000;
		outline: none;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
		cursor: pointer;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #000000;
		cursor: -webkit-grab;
	}

	.slider::-moz-range-thumb {
		width: 13px;
		height: 13px;
		border-radius: 50%;
		background: #000000;
		cursor: -moz-grab;
	}
</style>
