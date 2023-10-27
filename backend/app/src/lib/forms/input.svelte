<script lang="ts" context="module">
	export type InputType =
		| 'hidden'
		| 'text'
		| 'email'
		| 'password'
		| 'number'
		| 'tel'
		| 'url'
		| 'file'
		| 'textarea'
		| 'datetime-local'
		| 'checkbox'
		| 'custom'
		| 'switch'
		| 'date';
</script>

<script lang="ts">
	import { formFieldProxy, dateProxy } from 'sveltekit-superforms/client';
	import { getFormContext } from './form.svelte';
	import FieldWrapper from './fieldParts/fieldWrapper.svelte';
	import { fieldHasErrors } from './fieldParts/fieldError.svelte';
	import { SlideToggle } from '@skeletonlabs/skeleton';
	import type { Writable } from 'svelte/store';

	export let field: string;
	export let type: InputType = 'text';
	export let label = '';
	export let placeholder = 'example...';
	export let data: string | number | boolean | Date | null = '';
	export let accept = '';
	export let required = true;
	export let info: string = '';
	export let openEditor: boolean = false;
	export let text_action: string = '';
	export let disabled = false;

	const { superform } = getFormContext();
	const { value, errors, constraints } = formFieldProxy(superform, field);

	const proxyDate = dateProxy(superform.form, 'date', { format: 'datetime-local' });
	$: boolValue = value as Writable<boolean>;

	if (data !== '') {
		$value = data;
		if (type === 'hidden') {
			label = 'null';
		}
	}
	const setType = (node: HTMLInputElement) => {
		node.type = type;
	};

	$: hasErrors = fieldHasErrors($errors);
</script>

{#if type === 'textarea'}
	<FieldWrapper {field} {label} {info}>
		<div class="flex justify-end">
			<SlideToggle name="openEditor" size="sm" bind:checked={openEditor}>Edit</SlideToggle>
		</div>

		<div class="card variant-ghost-tertiary m-2 p-2 whitespace-pre-wrap">
			{@html $value}
		</div>
		<textarea
			name={field}
			class:hidden={!openEditor}
			class="textarea"
			rows="5"
			bind:value={$value}
			class:input-error={hasErrors}
			data-invalid={hasErrors}
			{placeholder}
			{...$constraints}
		/>
	</FieldWrapper>
{:else if type === 'datetime-local'}
	<FieldWrapper {field} {label} {info}>
		<input
			{required}
			use:setType
			name={field}
			class="input"
			bind:value={$proxyDate}
			class:input-error={hasErrors}
			data-invalid={hasErrors}
			{placeholder}
			{...$constraints}
		/>
	</FieldWrapper>
{:else if type === 'file'}
	<FieldWrapper {field} {label} {info}>
		<input
			{required}
			use:setType
			name={field}
			class="input"
			{accept}
			bind:value={$value}
			class:input-error={hasErrors}
			data-invalid={hasErrors}
			{placeholder}
			{...$constraints}
		/>
	</FieldWrapper>
{:else if type === 'switch'}
	<FieldWrapper {field} {label} {info}>
		<SlideToggle
			{disabled}
			active="bg-primary-500"
			size="sm"
			name={field}
			value="true"
			bind:checked={$boolValue}
		>
			<span class="capitalize">{text_action}</span>
		</SlideToggle>
		<!-- <input type="checkbox" value="true" class="hidden" name={field} checked={$boolValue} /> -->
	</FieldWrapper>
{:else if type === 'custom'}
	<FieldWrapper {field} {label} {info}>
		<slot />
	</FieldWrapper>
{:else}
	<FieldWrapper {field} {label} {info}>
		<input
			{required}
			use:setType
			name={field}
			class="input"
			bind:value={$value}
			class:input-error={hasErrors}
			data-invalid={hasErrors}
			{placeholder}
			{...$constraints}
		/>
	</FieldWrapper>
{/if}
