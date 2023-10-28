<script lang="ts">
	import { dateFormat, hourFormat } from '$lib/client/utility';
	import { type ModalSettings, getModalStore, type ModalComponent } from '@skeletonlabs/skeleton';
	import Delete from '$lib/components/crud/delete.svelte';
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import { createScheduledItem } from '$lib/components/crud/schema';
	import EpisodeSelector from '$lib/components/crud/episodeSelector.svelte';
	export let data;
	$: episodes = data.episodes || [];
	$: scheduledItems = data.scheduledItems || [];
	$: schedule = data.schedule || [];
	let updateForm: boolean = false;
	let createForm: boolean = false;
	const modalStore = getModalStore();

	function deleteModal(): void {
		const c: ModalComponent = { ref: Delete };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			meta: { action: '?/delete&id=' + schedule.id }
		};
		modalStore.trigger(modal);
	}
	const superformCreate = superForm(data.createForm, {
		taintedMessage: null,
		validators: createScheduledItem,
		onResult({ result }) {
			if (result.type === 'success') {
				createForm = false;
				updateForm = false;
			}
		},
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
</script>

{#if schedule}
	<div class="container mx-auto p-2 lg:p-10">
		<div class="flex justify-between">
			<div class="p-4">
				<h2 class="h2">{dateFormat(schedule.date, true)}</h2>
				<p>{schedule.info}</p>
				<p class="text-primary-500 font-bold text-lg">{schedule.manual ? 'Manual' : 'Automated'}</p>
			</div>
			<div class="btn-group sm:btn-group-vertical variant-ghost mt-auto mb-auto">
				<button
					class="variant-ghost"
					on:click={() => ((createForm = !createForm), (updateForm = false))}>Add Item</button
				>
				<button
					class="variant-ghost-secondary"
					on:click={() => ((updateForm = !updateForm), (createForm = false))}>Update</button
				>
				<button
					on:click={() => {
						deleteModal();
					}}
					class="variant-filled-error">Delete</button
				>
			</div>
		</div>
		{#if scheduledItems.length > 0}
			<section class="p-4">
				<!-- Responsive Container (recommended) -->
				<div class="table-container">
					<!-- Native Table Element -->
					<table class="table table-hover">
						<thead>
							<tr>
								<th>Artist</th>
								<th>Title</th>
								<th>When</th>
								<th>Episode</th>
							</tr>
						</thead>
						<tbody>
							{#each scheduledItems as item}
								<tr>
									<td>{item.artist}</td>
									<td>{item.title}</td>
									<td>{hourFormat(item.date)}</td>
									<td><a href="/">{item.episode}</a></td>
								</tr>
							{/each}
						</tbody>
						<tfoot>
							<tr>
								<th colspan="3">Total</th>
								<td>{scheduledItems.length}</td>
							</tr>
						</tfoot>
					</table>
				</div>
			</section>
		{:else}
			<p>No items yet</p>
		{/if}
	</div>
	{#if createForm}
		<div class="card mb-5 mx-10 p-10 variant-ringed">
			<div class="flex justify-between pb-5">
				<h2 class="h2">New Schedule Item</h2>
				<button class="btn-icon variant-filled" on:click={() => (createForm = false)}>✕</button>
			</div>
			<Form action="?/createScheduledItem" superform={superformCreate} showRequiredIndicator={true}>
				<Input type="text" field="artist" />
				<Input type="text" field="title" />
				<Input
					type="time"
					field="date"
					label="When"
					day={new Date(schedule.date)}
					data={new Date(schedule.date)}
				/>
				<Input type="hidden" field="schedule" data={schedule.id} />
				<Input type="custom" field="episode">
					<EpisodeSelector allEpisodes={episodes} />
				</Input>

				<SubmitButton field="Create Item" />
			</Form>
		</div>
	{/if}
{/if}
