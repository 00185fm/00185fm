<script lang="ts">
	import { superForm } from 'sveltekit-superforms/client';
	import Form from '$lib/forms/form.svelte';
	import SubmitButton from '$lib/forms/submitButton.svelte';
	import Input from '$lib/forms/input.svelte';
	import { loginSchema } from './schema';

	export let data;

	const superform = superForm(data.form, {
		taintedMessage: null,
		validators: loginSchema,
		onError({ result, message }) {
			console.log(result.error.message);
			message.set(result.error.message);
		}
	});
</script>

<div class="card m-auto mt-16 max-w-md p-8">
	<h2 class="h2 font-bold text-2xl">Log in</h2>

	<Form {superform} showRequiredIndicator={false}>
		<Input type="email" field="email" />
		<Input type="password" field="password" />

		<SubmitButton field="Log in" />
	</Form>
</div>
