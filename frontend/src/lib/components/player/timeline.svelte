<script lang="ts">
	import CloseIcon from '$lib/icons/closeIcon.svelte';
	import { playing_archive } from '$lib/utility/stores';
	import { formatSecondsToHMS, handleBackLive } from '$lib/utility/utility';
	import { player } from './audio.svelte';
	let start: number = 0;
	$: end = 100;
	$: current_time = 0;
	let timeSlider: HTMLInputElement;
	let dragging: boolean = false;

	function seek(time: number) {
		player.currentTime = time;
	}

	/////////// CURRENT TIME
	$: {
		if (player && $playing_archive) {
			player.onloadeddata = () => {
				end = player.duration;

				player.ontimeupdate = () => {
					if (!dragging) {
						current_time = player.currentTime;
					}
				};
				player.onended = () => {
					handleBackLive();
				};
			};
		}
	}

	////////// DRAGGING
	$: {
		if (timeSlider) {
			timeSlider.onmousedown = () => {
				// console.log('mousedown');
				dragging = true;
				// console.log(timeSlider.value);
			};
			timeSlider.onmouseup = () => {
				// console.log('mouseup');
				seek(Number(timeSlider.value));
				dragging = false;
			};
		}
	}
</script>

<div class="z-50 flex space-x-4 border-t border-black px-4 py-1">
	<div class="flex w-full items-center justify-between gap-2">
		<span>{formatSecondsToHMS(current_time)}</span>
		<input
			class="slider"
			type="range"
			bind:this={timeSlider}
			bind:value={current_time}
			min={start}
			max={end}
		/>
		<span>{formatSecondsToHMS(end)}</span>
	</div>
	<button on:click={handleBackLive}><CloseIcon /></button>
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
