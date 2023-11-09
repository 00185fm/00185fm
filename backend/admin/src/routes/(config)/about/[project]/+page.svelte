<script lang="ts">
	import { updateProject } from '$lib/components/crud/schema';
	import Form from '$lib/forms/form.svelte';
	import Input from '$lib/forms/input.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import { superForm } from 'sveltekit-superforms/client';
	export let data;
	$: project = data.project || {};
	let updateForm: boolean = false;
	const superform = superForm(data.form, {
		taintedMessage: null,
		validators: updateProject,
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
</script>

<div class="container p-2 lg:p-10 text-center">
	<p class="text-2xl text-center font-bold">
		{project.name}
		<button
			on:click={() => {
				updateForm = !updateForm;
			}}
			class="btn variant-ghost-primary">Edit</button
		>
	</p>
	{#if !updateForm}
		<div class="py-2">
			<span class="text-lg font-bold">Website</span>
			<p>{project.website}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">Contact Email</span>
			<p>{project.email}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">Support Us</span>
			<p>{project.support}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">Telegram</span>
			<p>{project.telegram}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">Bandcamp</span>
			<p>{project.bandcamp}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">YouTube</span>
			<p>{project.youtube}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">Instagram</span>
			<p>{project.instagram}</p>
		</div>
		<div class="py-2">
			<span class="text-lg font-bold">Facebook</span>
			<p>{project.facebook}</p>
		</div>
	{:else}
		<Form {superform} showRequiredIndicator={true} action="?/update">
			<Input field="id" type="hidden" data={project.id} />
			<div class="grid lg:grid-cols-2 gap-2">
				<Input
					required={false}
					field="website"
					type="text"
					label="Website"
					data={project.website}
				/>
				<Input
					required={false}
					field="email"
					type="email"
					label="Contact Email"
					data={project.email}
				/>
				<Input
					required={false}
					field="support"
					type="email"
					label="Support Email"
					placeholder="PayPal Email"
					data={project.support}
				/>
				<Input
					required={false}
					field="telegram"
					type="text"
					label="Telegram"
					data={project.telegram}
				/>
				<Input
					required={false}
					field="bandcamp"
					type="text"
					label="Bandcamp"
					data={project.bandcamp}
				/>
				<Input
					required={false}
					field="youtube"
					type="text"
					label="YouTube"
					data={project.youtube}
				/>
				<Input
					required={false}
					field="instagram"
					type="text"
					label="Instagram"
					data={project.instagram}
				/>
				<Input
					required={false}
					field="facebook"
					type="text"
					label="Facebook"
					data={project.facebook}
				/>
			</div>
			<SubmitButton field="Update Project" />
		</Form>
	{/if}
</div>
