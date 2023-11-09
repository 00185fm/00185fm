<script lang="ts">
	import { enhance } from '$app/forms';
	import { getModalStore } from '@skeletonlabs/skeleton';
	const modalStore = getModalStore();
	export let action: string = $modalStore[0].meta?.action || '';
	export let parent: any;
</script>

<div class="card p-4 w-modal shadow-xl space-y-4">
	<header class="card-header text-center">
		<h2 class="h2">⚠ WARNING ⚠</h2>
	</header>
	<section class="p-4 text-center">
		<p>Do you really want to delete this item?</p>
		<p>
			You will not be able to undo this operation, <span class="text-red-600">
				please be careful!</span
			>
		</p>
	</section>
	<footer class="card-footer">
		<div class="flex justify-end gap-2">
			<button on:click={parent.onClose} class="btn variant-outline">Cancel</button>
			<form method="post" {action} use:enhance>
				<button type="submit" on:click={() => modalStore.close()} class="btn variant-filled-error"
					>Confirm</button
				>
			</form>
		</div>
	</footer>
</div>
{#if false}<slot />{/if}
