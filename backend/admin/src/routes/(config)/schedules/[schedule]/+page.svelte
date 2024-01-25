<script lang="ts">
	import { dateFormat, hourFormat, slugify } from '$lib/client/utility';
	import {
		type ModalSettings,
		getModalStore,
		type ModalComponent,
		SlideToggle
	} from '@skeletonlabs/skeleton';
	import Delete from '$lib/components/crud/delete.svelte';
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import { formFieldProxy, superForm } from 'sveltekit-superforms/client';
	import { createScheduledItem, updateSchedule } from '$lib/components/crud/schema';
	import EpisodeSelector from '$lib/components/crud/episodeSelector.svelte';
	import type { Writable } from 'svelte/store';
	import { onMount } from 'svelte';
	export let data;
	$: episodes = data.episodes || [];
	$: scheduledItems = data.scheduledItems || [];
	$: schedule = data.schedule || [];
	let updateForm: boolean = false;
	let createForm: boolean = false;
	let editDate: boolean = false;
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
	const superformUpdate = superForm(data.updateForm, {
		taintedMessage: null,
		validators: updateSchedule,
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
	const { value } = formFieldProxy(superformUpdate, 'manual');
	$: boolValue = value as Writable<boolean>;
	onMount(() => {
		if (schedule) $boolValue = schedule.manual;
	});
</script>

{#if schedule}
	<div class="container mx-auto p-2 lg:p-10">
		<div class="flex justify-between">
			<div class="p-4">
				<h2 class="h2">{dateFormat(schedule.date, true)}</h2>
				<p>{schedule.info}</p>
				<p class="text-primary-500 font-bold text-lg">
					{schedule.manual ? '♟ Manual' : '🤖 Automated'}
				</p>
			</div>
			<div class="btn-group-vertical lg:btn-group variant-ghost mt-auto mb-auto">
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
		<div class="p-4 text-center">
			<p>
				Here you can manage the schedule for this day. You can add new items, update existing ones
				or delete them.
				{#if !schedule.manual}
					<p class="text-lg text-primary-500 font-bold">
						THIS SCHEDULE IS AUTOMATED. TO BE ABLE TO SCHEDULE ITEMS, YOU MUST CREATE DESIRED
						EPISODES FIRST.
					</p>
				{/if}
			</p>
		</div>
		{#if scheduledItems.length > 0}
			<section class="p-4">
				<!-- Responsive Container (recommended) -->
				<div class="table-container">
					<!-- Native Table Element -->
					<table class="table table-hover table-interactive">
						<thead>
							<tr>
								<th>When</th>
								<th>Artist</th>
								<th>Title</th>
								<th>Episode</th>
								<th>Action</th>
							</tr>
						</thead>
						<tbody>
							{#each scheduledItems as item}
								<tr>
									<td class="table-cell-fit table-row-checked text-center font-bold text-lg"
										>{hourFormat(item.date)}</td
									>
									<td>{item.artist}</td>
									<td>{item.title}</td>
									<td>
										{#if !item.expand}
											<span class="btn btn-sm variant-ghost">No Linked Episode</span>
										{:else}
											<a class="btn btn-sm variant-ghost" href="/shows/{item.expand.episode.slug}"
												>{item.expand.episode.author} - {item.expand.episode.title}</a
											>
										{/if}
									</td>
									<td class="space-x-2">
										<a
											class="btn-icon btn-icon-sm variant-ghost"
											href={`/schedules/${slugify(dateFormat(schedule.date, true))}/${item.id}`}
											>⚙️</a
										>
										<form
											class="inline-block"
											action="?/deleteScheduledItem&id={item.id}"
											method="post"
										>
											<button type="submit" class="btn-icon btn-icon-sm variant-ghost-primary"
												>🗑</button
											>
										</form>
									</td>
								</tr>
							{/each}
						</tbody>
						<tfoot>
							<tr>
								<th colspan="1">Total</th>
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
			<Form
				autocomplete={false}
				action="?/createScheduledItem"
				superform={superformCreate}
				showRequiredIndicator={true}
			>
				<Input type="hidden" field="schedule" data={schedule.id} />
				<Input type="custom" field="episode">
					<EpisodeSelector manual={schedule.manual} allEpisodes={episodes} />
				</Input>
				<Input type="time" field="date" label="When" day={new Date(schedule.date)} />
				<SubmitButton field="Create Item" />
			</Form>
		</div>
	{/if}
	{#if updateForm}
		<div class="card mb-5 mx-10 p-10 variant-ringed">
			<div class="flex justify-between pb-5">
				<h2 class="h2">Update Schedule</h2>
				<button class="btn-icon variant-filled" on:click={() => (updateForm = false)}>✕</button>
			</div>
			<Form action="?/updateSchedule" superform={superformUpdate} showRequiredIndicator={true}>
				<Input type="hidden" field="id" data={schedule.id} />
				<SlideToggle
					active="bg-primary-500"
					size="sm"
					name="editDate"
					value="true"
					bind:checked={editDate}
				>
					<span class="capitalize">Update Date</span>
				</SlideToggle>
				{#if editDate}
					<Input info="The day this livestream will take place." type="date" field="date" />
				{/if}
				<Input
					data={schedule.info}
					required={false}
					info="Here you can specify where and what will be streamed - e.g. 'Live from Asile - Turin' or 'Takeover from NGHE - Bruxelles'"
					type="text"
					field="info"
					placeholder="Live from Asile - Turin"
				/>
				<Input
					info="Should this livestream be manually handled or automated? If this parameter is off (default) the episodes will be automatically published and broadcasted at the specified date."
					required={false}
					type="custom"
					field="manual"
				>
					<div class="px-2">
						<SlideToggle
							active="bg-primary-500"
							size="sm"
							name="manual"
							value="true"
							bind:checked={$boolValue}
						>
							<span class="capitalize">{$boolValue ? 'Manual' : 'Automated'}</span>
						</SlideToggle>
					</div>
				</Input>
				<SubmitButton field="Update Schedule" />
			</Form>
		</div>
	{/if}
{/if}
