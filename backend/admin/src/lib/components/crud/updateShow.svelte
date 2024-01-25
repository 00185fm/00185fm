<script lang="ts">
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import type { RecordModel } from 'pocketbase';
	import { superForm } from 'sveltekit-superforms/client';
	import { updateShow } from '$lib/components/crud/schema';
	import { TabGroup, Tab } from '@skeletonlabs/skeleton';
	import Uploader from './uploader.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	export let form;
	export let show: RecordModel;
	export let updateForm: boolean = true;
	export let token: string = '';
	export let tabSet: number = 0;
	export let image: string = '';

	let uploading = false;
	let openEditor: boolean = false;
	let next_locked = false;
	let lock_upload = false;

	const u_superform = superForm(form, {
		taintedMessage: null,
		validators: updateShow,
		onResult({ result }) {
			if (result.type === 'success') {
				updateForm = false;
			}
		},
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
</script>

<div class="card mb-5 p-10 variant-ringed" class:animate-pulse={uploading}>
	<div class="flex justify-between pb-5">
		<h2 class="h2">Update Show</h2>
		<button class="btn-icon variant-filled" on:click={() => (updateForm = false)}>✕</button>
	</div>
	<TabGroup>
		<Tab bind:group={tabSet} name="General" value={0}>General</Tab>
		<Tab bind:group={tabSet} name="Image" value={1}>Image</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Form superform={u_superform} showRequiredIndicator={false} action="?/update">
					<Input type="hidden" field="id" data={show.id} />
					<Input
						info="You have to know that changing 'Title' the show url will <span class='text-red-500 font-bold text-xl'>NOT</span> update. <p class='p-2'>URL = 'https://00185fm.eu/shows/{show.slug}'</p>"
						type="text"
						field="title"
						data={show.title}
					/>
					<Input
						info="This should be the curator name. Feel free to use a generic name (like 'GUESTS'), you will be able to choose a specific 'Author' for each episode."
						type="text"
						field="author"
						data={show.author}
					/>
					<Input
						info="<p>Use any <a href='https://00185fm.github.io/tw-editor/' target='_blank' style='text-shadow: rgb(255, 253, 0) 9px 3px 5px;' class='text-secondary-700 font-bold text-xl'>rich text to html editor</a> to customize the description styling (<a href='https://wordtohtml.net/' target='_blank' class='btn-icon btn-icon-sm variant-filled-primary'>👁</a>). Then activate the 'Editor' and copy&paste the result in the box.</p> <p class='text-sm text-red-500'>Images are not allowed yet.</p>"
						placeholder="Write here than make the 'Editor' inactive to proceed"
						required={false}
						bind:openEditor
						type="textarea"
						field="description"
						data={show.description}
					/>
					<SubmitButton disabled={next_locked} field="Update Show" />
				</Form>
			{:else if tabSet === 1}
				{#if image !== ''}
					<div class="card">
						<header class="card-header text-xl font-bold text-center">Current Image</header>
						<section class="p-4 flex justify-center">
							<img src={image} alt="episode art" class="w-1/3" />
						</section>
						<footer class="card-footer">
							<div class="flex justify-end">
								<button
									class="btn variant-filled"
									on:click={() => {
										image = '';
									}}>Cancel</button
								>
							</div>
						</footer>
					</div>
				{:else}
					<Uploader
						item={show}
						{token}
						bind:lock_upload
						bind:form={updateForm}
						bind:uploading
						uploadItems={['image']}
					/>
				{/if}
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
