<script lang="ts">
	import { dateFormat, hourFormat } from '$lib/client/utility';
	import EpisodeSelector from '$lib/components/crud/episodeSelector.svelte';
	import { updateScheduledItem } from '$lib/components/crud/schema';
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';

	import { superForm } from 'sveltekit-superforms/client';

	export let data;
	let editDate: boolean = false;
	const { episodes } = data;
	let { scheduledItem } = data;
	const superformUpdate = superForm(data.updateForm, {
		taintedMessage: null,
		validators: updateScheduledItem,
		onResult({ result }) {
			if (result.type === 'success') {
				console.log(result);
			}
		},
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
</script>

<div class="container mx-auto p-2 lg:p-10">
	<div class="p-4">
		<h2 class="h2">{dateFormat(scheduledItem.expand?.schedule.date, true)}</h2>
		<p>{scheduledItem.expand?.schedule.info}</p>
		<p class="text-primary-500 font-bold text-lg">
			{scheduledItem.expand?.schedule.manual ? '♟ Manual' : '🤖 Automated'}
		</p>
	</div>

	<Form
		autocomplete={false}
		action="?/updateScheduledItem"
		superform={superformUpdate}
		showRequiredIndicator={true}
	>
		<Input type="hidden" field="id" data={scheduledItem.id} />
		<Input type="custom" field="episode" data={scheduledItem.episode}>
			<EpisodeSelector
				scheduled={scheduledItem}
				manual={scheduledItem.expand?.schedule.manual}
				allEpisodes={episodes}
			/>
		</Input>

		<SlideToggle
			active="bg-primary-500"
			size="sm"
			name="editDate"
			value="true"
			bind:checked={editDate}
		>
			<span class="capitalize"
				>Update Time - Current: <span class="text-primary-500"
					>{hourFormat(scheduledItem.date)}</span
				></span
			>
		</SlideToggle>

		{#if editDate}
			<Input type="time" field="date" label="When" day={new Date(scheduledItem.date)} />
		{/if}

		<SubmitButton field="Update Item" />
	</Form>
</div>
