<script lang="ts">
	import Ban from '$lib/icons/ban.svelte';
	import { fade } from 'svelte/transition';
	export let lock_delete: boolean = true;
</script>

<aside class="alert variant-ghost-warning my-4" transition:fade|local={{ duration: 200 }}>
	<!-- Icon -->
	<div><Ban /></div>
	<!-- Message -->
	<div class="alert-message">
		<h3 class="h3">Operation denied</h3>
		<p>
			You can't delete a show with active episodes. Try again after all episodes below are deleted.
		</p>
	</div>
	<!-- Actions -->
	<div class="alert-actions">
		<button
			class="btn-icon btn-icon-base"
			on:click={() => {
				lock_delete = false;
			}}>𝗫</button
		>
	</div>
</aside>
