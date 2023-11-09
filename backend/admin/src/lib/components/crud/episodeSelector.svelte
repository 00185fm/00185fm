<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { RecordModel } from 'pocketbase';
	export let allEpisodes: RecordModel[] = [];
	export let episode_id: string = '';
	let episodesOptions: AutocompleteOption[] = [];
	import Input from '$lib/forms/input.svelte';
	if (allEpisodes.length > 0) {
		allEpisodes.forEach((episode) => {
			episodesOptions.push({
				label: (episode.author + ' - ' + episode.title) as string,
				value: episode.id as string
			});
		});
	}
	export let manual: boolean = false;
	let popupSettings: PopupSettings = {
		event: 'focus-blur',
		target: 'popupAutocomplete',
		placement: 'bottom'
	};
	let inputPopup: string = '';
	let res: string = '';

	$: if (inputPopup === '') {
		res = '';
	}
	function onPopupDemoSelect(event: CustomEvent<AutocompleteOption>): void {
		inputPopup = event.detail.label as string;
		res = event.detail.value as string;
	}

	const findEpisode = (id: string) => {
		return allEpisodes.find((episode) => {
			if (episode.id === id) {
				return { artist: episode.artist, title: episode.title, date: episode.date };
			}
		});
	};
	// $: if (episode_id !== '') res = episode_id;
	$: console.log(episode_id);
	$: foundEpisode = findEpisode(res);
	$: console.log(foundEpisode);
</script>

<div class="card mb-2 p-2 variant-ringed space-y-2">
	<input
		required={!manual}
		class="input autocomplete"
		type="search"
		name="autocomplete"
		bind:value={inputPopup}
		placeholder="Select episode if already created..."
		use:popup={popupSettings}
	/>
	{#if !manual && foundEpisode}
		<input class="hidden" type="text" name="artist" value={foundEpisode.author} />
		<input class="hidden" type="text" name="title" value={foundEpisode.title} />
		<Input
			hidden={true}
			type="datetime-local"
			field="date"
			label="When"
			day={new Date(foundEpisode?.date)}
			data={foundEpisode?.date}
		/>
	{/if}

	<div class="w-full">
		<input class="hidden" type="text" name="episode" bind:value={res} />
		<div data-popup="popupAutocomplete">
			<Autocomplete
				regionNav="variant-glass-primary w-full rounded-2xl"
				regionItem="p-2 w-full"
				bind:input={inputPopup}
				options={episodesOptions}
				on:selection={onPopupDemoSelect}
			/>
		</div>
	</div>
</div>
