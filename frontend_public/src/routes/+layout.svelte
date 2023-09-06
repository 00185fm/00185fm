<script lang="ts">
	import Header from '$lib/components/header.svelte';
	import Player from '$lib/components/player/player.svelte';
	// Your custom Skeleton theme:
	import '../theme.postcss';
	// This contains the bulk of Skeletons required styles:
	import '@skeletonlabs/skeleton/styles/skeleton.css';
	// Finally, your application's global stylesheet (sometimes labeled 'app.css')
	import '../app.postcss';

	import { AppShell } from '@skeletonlabs/skeleton';

	export let data;
</script>

<svelte:head>
	<title>00185fm - New Weird Italia Radio</title>
</svelte:head>

<!-- App Shell -->
<AppShell>
	<svelte:fragment slot="header">
		<Header />
	</svelte:fragment>
	<slot />
	<svelte:fragment slot="footer">
		<Player initNP={data.np} />
	</svelte:fragment>
</AppShell>
