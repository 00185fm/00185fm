<script lang="ts">
	import { getFormContext } from './form.svelte';

	export let className = 'btn variant-filled';
	export let field = 'Submit';
	export let disabled: boolean = false;

	const { superform } = getFormContext();
	const { allErrors } = superform;
	$: {
		if ($allErrors.length >= 1) {
			disabled = true;
		} else if ($allErrors.length === 0 && disabled) {
			disabled = false;
		}
	}
</script>

<div class="text-center sm:flex sm:justify-end">
	<button type="submit" class={className} {disabled}>
		<slot>{field}</slot>
	</button>
</div>
