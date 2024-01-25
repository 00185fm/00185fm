<script lang="ts">
	import { dateFormat } from '$lib/client/utility';
	import { TabGroup, Tab, SlideToggle } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import { updateEpisode } from '$lib/components/crud/schema';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import Uploader from '$lib/components/crud/uploader.svelte';
	import type { RecordModel } from 'pocketbase';
	export let form: any;
	export let token: string;
	export let episode: RecordModel;
	export let updateForm: boolean;
	let openDescriptionEditor: boolean = false;
	let openTracklistEditor: boolean = false;
	let next_locked = false;
	let lock_upload = false;
	let uploading = false;
	$: {
		if (openDescriptionEditor || openTracklistEditor) {
			next_locked = true;
		} else {
			next_locked = false;
		}
	}
	const superform = superForm(form, {
		taintedMessage: null,
		validators: updateEpisode,
		onResult({ result }) {
			if (result.type === 'success') {
				updateForm = false;
			} else {
				updateForm = true;
			}
		},
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
	export let tabSet: number = 0;
	export let image: string = '';
	export let audio: string = '';
	let updateDate = false;
</script>

<div class="card mb-5 p-10 variant-ringed" class:animate-pulse={uploading}>
	<div class="flex justify-between pb-5">
		<h2 class="h2">Update Episode</h2>
		<button class="btn-icon variant-filled" on:click={() => (updateForm = false)}>✕</button>
	</div>
	<TabGroup>
		<Tab bind:group={tabSet} name="General" value={0}>General</Tab>
		<Tab bind:group={tabSet} name="Image" value={1}>Image</Tab>
		<Tab bind:group={tabSet} name="Audio" value={2}>Audio</Tab>
		<Tab bind:group={tabSet} name="Advanced" value={3}>Advanced</Tab>
		<!-- Tab Panels --->
		<svelte:fragment slot="panel">
			{#if tabSet === 0}
				<Form {superform} showRequiredIndicator={true} action="?/update">
					<Input type="hidden" field="id" data={episode.id} />
					<Input type="hidden" field="slug" data={episode.slug} />
					<Input
						info="Episodes urls are based on their title without spaces, special characters and capitalization. ('Akkatastato #1' => 'akkatastato-1')"
						required={false}
						type="text"
						field="title"
						data={episode.title}
					/>
					<Input
						info="You can choose an author different from the show's one"
						required={false}
						type="text"
						field="author"
						data={episode.author}
					/>
					<Input
						info="This is the Artwork Credits field. You can use it to credit the artist who made the artwork for this episode."
						required={false}
						type="text"
						label="Artwork Credits"
						field="credits"
						data={episode.credits}
					/>
					<Input
						info="Should this episode be public? If you choose 'no' it will be hidden from the public website. If 'yes' it will be published on the selected date."
						required={false}
						type="switch"
						field="public"
						data={episode.public}
						text_action="Should this episode be public?"
					/>
					<div class="pt-4">
						<SlideToggle size="sm" name="date-update" bind:checked={updateDate}
							>Update Date - <span class="text-red-500 font-bold">{dateFormat(episode.date)}</span
							></SlideToggle
						>
					</div>
					{#if updateDate}
						<Input
							info="Choose a new date. Be accurate with hours if you can."
							type="datetime-local"
							field="date"
						/>
					{/if}
					<Input
						info="<p>Use any <a href='https://00185fm.github.io/tw-editor/' target='_blank' style='text-shadow: rgb(255, 253, 0) 9px 3px 5px;' class='text-secondary-700 font-bold text-xl'>rich text to html editor</a> to customize the description styling (<a href='https://wordtohtml.net/' target='_blank' class='btn-icon btn-icon-sm variant-filled-primary'>👁</a>). Then activate the 'Editor' and copy&paste the result in the box.</p> <p class='text-sm text-red-500'>Images are not allowed yet.</p>"
						required={false}
						bind:openEditor={openDescriptionEditor}
						type="textarea"
						field="description"
						data={episode.description}
						placeholder="Write here than make the 'Edit' switch inactive to proceed"
					/>
					<Input
						required={false}
						bind:openEditor={openTracklistEditor}
						type="textarea"
						field="tracklist"
						data={episode.tracklist}
						placeholder="Write here than make the 'Edit' switch inactive to proceed"
					/>
					<SubmitButton disabled={next_locked} field="Update Episode" />
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
						item={episode}
						{token}
						bind:lock_upload
						bind:form={updateForm}
						bind:uploading
						uploadItems={['image']}
					/>
				{/if}
			{:else if tabSet === 2}
				{#if audio !== ''}
					<div class="card">
						<header class="card-header text-xl font-bold text-center">Current Audio</header>
						<section class="p-4 flex justify-center">
							<audio src={audio} controls />
						</section>
						<footer class="card-footer">
							<div class="flex justify-end">
								<button
									class="btn variant-filled"
									on:click={() => {
										audio = '';
									}}>Cancel</button
								>
							</div>
						</footer>
					</div>
				{:else}
					<Uploader
						item={episode}
						{token}
						bind:lock_upload
						bind:form={updateForm}
						bind:uploading
						uploadItems={['audio']}
					/>
				{/if}
			{:else if tabSet === 3}
				<p>slug</p>
			{/if}
		</svelte:fragment>
	</TabGroup>
</div>
