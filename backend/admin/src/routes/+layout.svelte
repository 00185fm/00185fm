<script lang="ts">
	import '../app.postcss';
	import { Toast, AppShell, initializeStores, Modal } from '@skeletonlabs/skeleton';
	import { computePosition, autoUpdate, offset, shift, flip, arrow } from '@floating-ui/dom';

	import { storePopup } from '@skeletonlabs/skeleton';
	storePopup.set({ computePosition, autoUpdate, offset, shift, flip, arrow });

	import Heading from '$lib/components/layout/heading.svelte';
	import Sidebar from '$lib/components/layout/sidebar.svelte';
	import { page } from '$app/stores';
	export let data;
	$: currentUser = data.user;
	$: currentPage = $page.url.pathname;
	initializeStores();
	import { afterNavigate } from '$app/navigation';

	afterNavigate(() => {
		document.getElementById('page')?.scrollTo(0, 0);
	});
</script>

<svelte:head>
	<title>00185fm - Admin</title>
</svelte:head>
<Modal />
<Toast position="t" />
<AppShell>
	<svelte:fragment slot="header">
		<Heading {currentUser} page={currentPage} />
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft">
		{#if currentUser}
			<Sidebar />
		{/if}
	</svelte:fragment>
	<slot />
</AppShell>
