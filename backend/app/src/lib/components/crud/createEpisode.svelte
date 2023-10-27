<script lang="ts">
	import Uploader from './uploader.svelte';
	import { Step, Stepper } from '@skeletonlabs/skeleton';
	import { superForm } from 'sveltekit-superforms/client';
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import { newEpisode } from './schema';
	import type { RecordModel } from 'pocketbase';
	export let data: any;
	let uploading = false;
	const { token } = data;
	export let createForm = true;
	let lock_upload = true;
	let openDescriptionEditor: boolean = false;
	let openTracklistEditor: boolean = false;
	let next_locked = false;
	let created: RecordModel;
	$: created;
	$: {
		if (openDescriptionEditor || openTracklistEditor) {
			next_locked = true;
		} else {
			next_locked = false;
		}
	}
	const c_superform = superForm(data.createForm, {
		taintedMessage: null,
		validators: newEpisode,
		onResult({ result }) {
			created = result.data.created;
			if (result.type === 'success') {
				lock_upload = false;
			} else {
				lock_upload = true;
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
		<h2 class="h2">New Episode</h2>
		<button
			class="btn-icon variant-filled"
			disabled={uploading}
			on:click={() => {
				createForm = false;
			}}>✕</button
		>
	</div>
	<Stepper
		on:back={() => {
			createForm = false;
		}}
	>
		<Form superform={c_superform} showRequiredIndicator={true} action="?/create">
			<Step
				buttonNextType={'submit'}
				buttonNextLabel={'Create'}
				buttonBack="invisible"
				locked={next_locked}
			>
				<svelte:fragment slot="header">General</svelte:fragment>
				<Input
					type="text"
					field="title"
					info="Episodes urls are based on their title without spaces, special characters and capitalization. ('Akkatastato #1' => 'akkatastato-1')"
				/>
				<Input
					type="text"
					field="author"
					data={data.show.author}
					info="You can choose an author different from the show's one"
				/>
				<Input
					required={false}
					type="text"
					field="credits"
					label="Artwork Credits"
					info="This is the Artwork Credits field. You can use it to credit the artist who made the artwork for this episode."
				/>
				<Input
					info="Should this episode be public? If you choose 'no' it will be hidden from the public website. If 'yes' it will be published on the selected date."
					required={false}
					type="switch"
					field="public"
					text_action="Should this episode be public?"
				/>
				<Input
					info="Choose a new date. Be accurate with hours if you can."
					type="datetime-local"
					field="date"
				/>
				<Input
					info="<p>Use any <a href='https://00185fm.github.io/tw-editor/' target='_blank' style='text-shadow: rgb(255, 253, 0) 9px 3px 5px;' class='text-secondary-700 font-bold text-xl'>rich text to html editor</a> to customize the description styling (<a href='https://wordtohtml.net/' target='_blank' class='btn-icon btn-icon-sm variant-filled-primary'>👁</a>). Then activate the 'Edit' switch and copy&paste the result in the box.</p> <p class='text-sm text-red-500'>Images are not allowed yet.</p>"
					required={false}
					bind:openEditor={openDescriptionEditor}
					type="textarea"
					field="description"
					placeholder="Write here than make the 'Edit' switch inactive to proceed"
				/>
				<Input
					required={false}
					bind:openEditor={openTracklistEditor}
					type="textarea"
					field="tracklist"
					placeholder="Write here than make the 'Edit' switch inactive to proceed"
				/>
				<Input type="hidden" field="show" data={data.show.id} />
				<Input type="hidden" field="show_slug" data={data.show.slug} />
			</Step>
		</Form>
		<Step buttonComplete="invisible" buttonBackLabel={'No Files'}>
			<svelte:fragment slot="header">Upload</svelte:fragment>
			<Uploader bind:lock_upload item={created} {token} bind:form={createForm} bind:uploading />
		</Step>
	</Stepper>
</div>
