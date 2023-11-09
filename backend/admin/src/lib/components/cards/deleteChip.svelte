<script lang="ts">
	import { getModalStore, type ModalComponent, type ModalSettings } from '@skeletonlabs/skeleton';
	export let submit: string = ' 𝗫 ';
	export let class_str: string = 'chip variant-ghost-tertiary hover:variant-ghost-primary p-2 m-1';
	export let action: string = '';
	import Delete from '$lib/components/crud/delete.svelte';
	const modalStore = getModalStore();
	function deleteModal(): void {
		const c: ModalComponent = { ref: Delete };
		const modal: ModalSettings = {
			type: 'component',
			component: c,
			title: 'Please confirm',
			body: 'Do you really want to delete this item?',
			meta: { action: action }
		};
		modalStore.trigger(modal);
	}
</script>

<div class={class_str}>
	<button on:click={deleteModal}>
		{submit + ' 𝗫 '}
	</button>
</div>
