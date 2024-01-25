<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { RecordModel } from 'pocketbase';
	export let allEpisodes: RecordModel[] = [];
	export let scheduled: RecordModel | undefined = undefined;
	let foundEpisode: RecordModel | undefined;
	$: foundEpisode;
	let episodesOptions: AutocompleteOption[] = [];
	import Input from '$lib/forms/input.svelte';
	import { onMount } from 'svelte';
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
	$: inputPopup = '';
	$: res = '';
	$: if (inputPopup === '') {
		res = '';
	}
	$: artist = foundEpisode?.author;
	$: title = foundEpisode?.title;

	function onPopupDemoSelect(event: CustomEvent<AutocompleteOption>): void {
		inputPopup = event.detail.label as string;
		res = event.detail.value as string;
		foundEpisode = findEpisode(res);
	}

	const findEpisode = (id: string) => {
		return allEpisodes.find((episode) => {
			if (episode.id === id) {
				return { artist: episode.artist, title: episode.title, date: episode.date };
			}
		});
	};

	onMount(() => {
		if (!scheduled) return;
		if (scheduled?.episode !== '') {
			res = scheduled?.episode;
			foundEpisode = findEpisode(scheduled?.episode);
			inputPopup = foundEpisode?.author + ' - ' + foundEpisode?.title;
		}
	});
</script>

<div class="space-y-2">
	<input
		required={!manual}
		class="input autocomplete"
		type="search"
		name="autocomplete"
		bind:value={inputPopup}
		placeholder="Select episode if already created..."
		use:popup={popupSettings}
	/>

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

	{#if foundEpisode}
		<Input type="text" field="artist" bind:data={artist} />
		<Input type="text" field="title" bind:data={title} />
	{:else}
		<Input type="text" field="artist" data={scheduled?.artist} />
		<Input type="text" field="title" data={scheduled?.title} />
	{/if}
</div>
