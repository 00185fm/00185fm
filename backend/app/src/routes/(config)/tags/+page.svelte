<script lang="ts">
	import DeleteChip from '$lib/components/cards/deleteChip.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	import Form from '$lib/forms/form.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import Input from '$lib/forms/input.svelte';
	import { newTag } from './schema';

	export let data;
	$: tags = data.tags;
	let newForm = true;

	const superform = superForm(data.form, {
		taintedMessage: null,
		validators: newTag,
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});

	import { createSearchStore, searchHandler } from '$lib/stores/search';
	import { onDestroy } from 'svelte';
	import type { RecordModel } from 'pocketbase';

	let searchTag: RecordModel[];
	let searchStore;
	let unsubscribe: any;

	$: {
		searchTag = tags?.map((tag: RecordModel) => ({
			...tag,
			searchTerms: `${tag.tag}`
		}));
		searchStore = createSearchStore(searchTag);
		unsubscribe = searchStore.subscribe((model) => searchHandler(model));
	}

	onDestroy(() => {
		unsubscribe();
	});
</script>

<div class="container mx-auto p-10">
	<div class="flex justify-between">
		<h2 class="h2 p-5">Tags</h2>
		<input
			class="input mx-10 my-5"
			type="search"
			placeholder="Search..."
			bind:value={$searchStore.search}
		/>
		<div class="btn variant-ghost m-5">
			<button on:click={() => (newForm = !newForm)}>New</button>
		</div>
	</div>

	<div class="p-4">
		<p>
			Here you can easily find and delete tags. Go to episode's page for assign the tag to that
			episode (you can even create new ones from there)
		</p>
		<p class="text-sm text-red-500 p-2 text-center">
			Tags will be treated like a slug ('Ambient Rissa' => 'ambient-rissa')
		</p>
	</div>

	{#if newForm}
		<div class="card mb-5 p-10 variant-ringed">
			<div class="flex justify-between pb-5">
				<h2 class="h2">New Tag</h2>
				<button class="btn-icon variant-filled" on:click={() => (newForm = false)}>✕</button>
			</div>
			<Form action="?/create" {superform} showRequiredIndicator={false}>
				<Input type="text" field="tag" />

				<SubmitButton field="Create tag" />
			</Form>
		</div>
	{/if}

	{#if tags?.length > 0}
		<div class="p-4 text-center">
			<span class="text-red-500">⚠️</span>
			<span>By clicking on the ' 𝗫 ' you will delete the tag. Please be careful</span>
			<span class="text-red-500">⚠️</span>
		</div>
		{#each $searchStore.filtered as tag}
			<DeleteChip
				action={'?/delete&id=' + tag?.id}
				submit={tag?.tag}
				class_str={'chip variant-ghost-tertiary hover:variant-ghost-primary p-2 mr-2'}
			/>
		{/each}
	{:else}
		<div class="p-4 text-center">
			<span class="text-red-500">⚠️</span>
			<span>No tag found. Just write something in the field and click 'Create Tag'</span>
			<span class="text-red-500">⚠️</span>
		</div>
	{/if}
</div>
