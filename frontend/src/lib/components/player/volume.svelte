<script lang="ts">
	import VolumeIcon from '$lib/icons/volumeIcon.svelte';
	import { onMount } from 'svelte';
	import { player } from './audio.svelte';
	let volume: number = 100;
	let oldVolume: number = volume;
	let volSlider: HTMLInputElement;
	onMount(() => {
		volSlider.oninput = () => {
			player.volume = volume / 100;
			oldVolume = volume;
		};
	});
	function mute() {
		if (volume > 0) {
			volume = 0;
			player.volume = volume / 100;
		} else {
			volume = oldVolume;
			player.volume = volume / 100;
		}
	}
</script>

<div class="col-span-2 hidden h-full w-full max-w-xs items-center justify-center p-4 lg:flex">
	<button class="-mr-4" on:click={mute}>
		<VolumeIcon />
	</button>

	<input class="slider" type="range" bind:this={volSlider} bind:value={volume} min="0" max="100" />
</div>

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
