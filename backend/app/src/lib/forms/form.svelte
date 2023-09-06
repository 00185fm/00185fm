<script lang="ts" context="module">
	import { getContext } from 'svelte';
	import type { AnyZodObject } from 'zod';
	//

	export const FORM_KEY = Symbol('form');

	export type FormContext<T extends AnyZodObject> = {
		superform: SuperForm<T, unknown>;
		showRequiredIndicator: boolean;
	};

	export function getFormContext<T extends AnyZodObject>(): FormContext<T> {
		return getContext(FORM_KEY);
	}
</script>

<script lang="ts" generics="T extends AnyZodObject">
	// Logic
	import { setContext } from 'svelte';
	import type { SuperForm } from 'sveltekit-superforms/client';
	import type { ZodValidation } from 'sveltekit-superforms';

	import { focusTrap } from '@skeletonlabs/skeleton';

	export let superform: SuperForm<ZodValidation<T>, unknown>;
	export let showRequiredIndicator = false;
	export let action = '';

	export let className = 'space-y-6';

	const { errors, delayed, enhance, message, reset } = superform;

	setContext<FormContext<T>>(FORM_KEY, { superform, showRequiredIndicator });
</script>

<form
	class={className}
	{action}
	method="post"
	use:focusTrap={true}
	use:enhance
	enctype="multipart/form-data"
>
	<slot />
</form>
