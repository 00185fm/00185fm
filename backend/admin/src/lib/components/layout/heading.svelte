<script lang="ts">
	import Breadcrumb from './breadcrumb.svelte';
	import { AppBar } from '@skeletonlabs/skeleton';
	import { enhance } from '$app/forms';
	export let currentUser: any;
	export let page: string;
</script>

<AppBar>
	<svelte:fragment slot="lead">
		<a href="/">
			<img src="/img/00185fm_logo200px.png" alt="00185fm Logo" />
		</a>
	</svelte:fragment>
	{#if currentUser}
		<Breadcrumb {page} />
	{/if}
	<svelte:fragment slot="trail">
		{#if currentUser}
			<form method="POST" action="/logout" use:enhance>
				<button type="submit" class="btn variant-filled">Logout</button>
			</form>
		{:else}
			<a href="/login" class="btn variant-filled">Log in</a>
		{/if}
	</svelte:fragment>
</AppBar>
