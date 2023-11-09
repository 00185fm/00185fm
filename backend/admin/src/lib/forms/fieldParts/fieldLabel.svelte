<script lang="ts">
	import { getFormContext } from '../form.svelte';
	import { formFieldProxy } from 'sveltekit-superforms/client';
	import { fieldHasErrors } from './fieldError.svelte';
	import { Accordion, AccordionItem } from '@skeletonlabs/skeleton';

	export let field: string;
	export let text = '';
	export let info = '';
	if (!Boolean(text)) text = field;

	const { superform, showRequiredIndicator } = getFormContext();
	const { constraints, errors } = formFieldProxy(superform, field);

	function capitalizeFirstLetter(text: string) {
		return text.charAt(0).toUpperCase() + text.slice(1);
	}
</script>

{#if text != 'null'}
	{#if info !== ''}
		<Accordion regionPanel="variant-soft-secondary" hover="hover:variant-ghost-primary">
			<AccordionItem padding="p-2">
				<svelte:fragment slot="summary">
					<label for={field} class="label font-bold" class:text-red-400={fieldHasErrors($errors)}>
						<span>{capitalizeFirstLetter(text)} </span>
						{#if $constraints?.required && showRequiredIndicator}
							<span class="text-red-400">*</span>
						{/if}
					</label>
				</svelte:fragment>
				<svelte:fragment slot="content">
					<p>Info:</p>
					<p class="text-sm indent-2">{@html info}</p>
				</svelte:fragment>
			</AccordionItem>
		</Accordion>
	{:else}
		<label for={field} class="label font-bold" class:text-red-400={fieldHasErrors($errors)}>
			<span>{capitalizeFirstLetter(text)} </span>
			{#if $constraints?.required && showRequiredIndicator}
				<span class="text-red-400">*</span>
			{/if}
		</label>
	{/if}
{/if}
