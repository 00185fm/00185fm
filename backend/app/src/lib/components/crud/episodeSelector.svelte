<script lang="ts">
	import {
		Autocomplete,
		popup,
		type AutocompleteOption,
		type PopupSettings
	} from '@skeletonlabs/skeleton';
	import type { RecordModel } from 'pocketbase';
	export let allEpisodes: RecordModel[] = [];
	let episodesOptions: AutocompleteOption[] = [];
	if (allEpisodes.length > 0) {
		allEpisodes.forEach((episode) => {
			episodesOptions.push({
				label: (episode.author + ' - ' + episode.title) as string,
				value: episode.id as string
			});
		});
	}
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
</script>

<div class="card mb-2 p-2 variant-ringed">
	<input
		class="input autocomplete"
		type="search"
		name="autocomplete"
		bind:value={inputPopup}
		placeholder="Select episode if already created..."
		use:popup={popupSettings}
	/>
	<input class="hidden" type="text" name="episode" bind:value={res} />
	<div data-popup="popupAutocomplete">
		<Autocomplete
			regionItem="variant-ghost-primary rounded-full"
			bind:input={inputPopup}
			options={episodesOptions}
			on:selection={onPopupDemoSelect}
		/>
	</div>
</div>
