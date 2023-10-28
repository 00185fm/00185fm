<script lang="ts">
	import Form from '$lib/forms/form.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import Input from '$lib/forms/input.svelte';
	import { formFieldProxy, superForm } from 'sveltekit-superforms/client';
	import { createSchedule } from '$lib/components/crud/schema';
	import { dateFormat, slugify } from '$lib/client/utility';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';
	export let data;
	$: schedules = data.schedules || [];
	let createForm = false;
	const superform = superForm(data.createForm, {
		taintedMessage: null,
		validators: createSchedule,
		onResult({ result }) {
			if (result.type === 'success') {
				createForm = false;
			}
		},
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
	const { value } = formFieldProxy(superform, 'manual');
	$: boolValue = value as Writable<boolean>;
</script>

<div class="container mx-auto p-2 lg:p-10">
	<div class="flex justify-between">
		<h2 class="h2 p-5">Schedules</h2>
		<button class="btn variant-ghost m-5" on:click={() => (createForm = !createForm)}>Create</button
		>
	</div>
	{#if createForm}
		<div class="card mb-5 p-2 lg:p-10 variant-ringed">
			<div class="flex justify-between pb-5">
				<h2 class="h2">New Livestream</h2>
				<button class="btn-icon variant-filled" on:click={() => (createForm = false)}>✕</button>
			</div>
			<Form {superform} showRequiredIndicator={true} action="?/createSchedule">
				<Input info="The day this livestream will take place." type="date" field="date" />
				<Input
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
				<SubmitButton field="Create Schedule" />
			</Form>
		</div>
	{/if}

	{#if schedules?.length > 0}
		<div class="grid grid-flow-row lg:grid-cols-4 gap-2">
			{#each schedules as schedule}
				<a href={'/schedules/' + slugify(dateFormat(schedule.date, true))} class="card card-hover">
					<header class="card-header">
						<p class="text-xl font-bold">
							{dateFormat(schedule.date, true)}
						</p>
					</header>
					<section class="p-4">
						<p>{schedule.info}</p>
					</section>
				</a>
			{/each}
		</div>
	{:else}
		<p>No schedule found</p>
	{/if}
</div>
