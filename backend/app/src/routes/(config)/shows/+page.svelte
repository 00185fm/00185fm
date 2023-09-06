<script lang="ts">
	import ShowCard from '$lib/components/cards/showCard.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Form from '$lib/forms/form.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import Input from '$lib/forms/input.svelte';
	import { newShow } from '$lib/components/crud/schema';

	export let data;
	$: shows = data.shows;
	let createForm = false;
	let updateForm = false;

	import { createSearchStore, searchHandler, type SearchStoreModel } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { RecordModel } from 'pocketbase';
	let searchShows: RecordModel[];
	let searchStore: any;
	let unsubscribe: any;
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

<div class="container mx-auto p-10">
	<div class="flex justify-between">
		<h2 class="h2 p-5">Shows</h2>
		<input
			class="input mx-10 my-5"
			type="search"
			placeholder="Search..."
			bind:value={$searchStore.search}
		/>
		<button class="btn variant-ghost m-5" on:click={() => (createForm = !createForm)}>Create</button
		>
	</div>

	{#if createForm}
		<div class="card mb-5 p-10 variant-ringed">
			<div class="flex justify-between pb-5">
				<h2 class="h2">New Show</h2>
				<button class="btn-icon variant-filled" on:click={() => (createForm = false)}>✕</button>
			</div>
			<Form {superform} showRequiredIndicator={false} action="?/create">
				<Input type="text" field="title" />
				<Input type="text" field="author" />
				<Input type="textarea" field="description" />

				<SubmitButton field="Create Show" />
			</Form>
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
