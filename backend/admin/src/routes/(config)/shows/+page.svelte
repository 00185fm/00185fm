<script lang="ts">
	import ShowCard from '$lib/components/cards/showCard.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Form from '$lib/forms/form.svelte';
	// import SubmitButton from '$lib/forms/submitButton.svelte';
	import Input from '$lib/forms/input.svelte';
	import { newShow } from '$lib/components/crud/schema';
	let created: RecordModel;
	$: created;
	export let data;
	const { token } = data;
	$: shows = data.shows;
	let createForm = false;
	let updateForm = false;
	let uploading = false;

	import { createSearchStore, searchHandler, type SearchStoreModel } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { RecordModel } from 'pocketbase';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import Uploader from '$lib/components/crud/uploader.svelte';
	let searchShows: RecordModel[];
	let searchStore: any;
	let unsubscribe: any;

	let next_locked = false;
	let lock_upload = true;
	$: {
		searchShows = shows?.map((show: RecordModel) => ({
			...show,
			searchTerms: `${show.title} ${show.author} ${show.description} ${show.slug}`
		}));

		searchStore = createSearchStore(searchShows);

		unsubscribe = searchStore.subscribe((model: SearchStoreModel<Record<PropertyKey, any>>) =>
			searchHandler(model)
		);
	}
	onDestroy(() => {
		unsubscribe();
	});

	const superform = superForm(data.form, {
		taintedMessage: null,
		validators: newShow,
		onResult({ result }) {
			// @ts-ignore
			created = result.data.created;
			if (result.type === 'success') {
				lock_upload = false;
			} else {
				lock_upload = true;
			}
			// if (result.type === 'success') {
			// 	createForm = false;
			// 	updateForm = false;
			// }
		},
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
</script>

<div class="container mx-auto p-2 sm:p-10">
	<div class="sm:flex text-center sm:text-left sm:justify-between">
		<h2 class="h2 p-4">Shows</h2>
		<input
			class="input sm:mx-10 sm:my-5"
			type="search"
			placeholder="Search..."
			bind:value={$searchStore.search}
		/>
		<button class="btn variant-ghost m-5" on:click={() => (createForm = !createForm)}>Create</button
		>
	</div>

	{#if createForm}
		<div class="card mb-5 p-10 variant-ringed" class:animate-pulse={uploading}>
			<div class="flex justify-between pb-5">
				<h2 class="h2">New Show</h2>
				<button class="btn-icon variant-filled" on:click={() => (createForm = false)}>✕</button>
			</div>
			<Stepper
				on:back={() => {
					updateForm = false;
				}}
			>
				<Form {superform} showRequiredIndicator={true} action="?/create">
					<Step
						buttonNextType={'submit'}
						buttonNextLabel={'Create Show'}
						buttonBack="invisible"
						locked={next_locked}
					>
						<svelte:fragment slot="header">General</svelte:fragment>
						<Input info="This will be used for generating the show url" type="text" field="title" />
						<Input
							info="This should be the curator name. Feel free to use a generic name (like 'GUESTS'), you will be able to choose a specific 'Artist' for each episode."
							type="text"
							field="author"
							label="Artist"
						/>
						<Input
							info="<p>Use any <a href='https://00185fm.github.io/tw-editor/' target='_blank' style='text-shadow: rgb(255, 253, 0) 9px 3px 5px;' class='text-secondary-700 font-bold text-xl'>rich text to html editor</a> to customize the description styling (<a href='https://wordtohtml.net/' target='_blank' class='btn-icon btn-icon-sm variant-filled-primary'>👁</a>). Then activate the 'Editor' and copy&paste the result in the box.</p> <p class='text-sm text-red-500'>Images are not allowed yet.</p>"
							placeholder="Write here than make the 'Editor' inactive to proceed"
							required={false}
							type="textarea"
							field="description"
						/>
					</Step>
				</Form>
				<Step buttonComplete="invisible" buttonBackLabel={'No Files'}>
					<svelte:fragment slot="header">Upload</svelte:fragment>
					<Uploader
						{lock_upload}
						item={created}
						{token}
						bind:form={createForm}
						bind:uploading
						uploadItems={['image']}
					/>
				</Step>
			</Stepper>
		</div>
	{/if}

	<div class="grid grid-rows-1 gap-2">
		{#if shows?.length > 0}
			{#each $searchStore.filtered as show}
				<ShowCard {show} />
			{/each}
		{:else}
			<p>No shows found</p>
		{/if}
	</div>
</div>
