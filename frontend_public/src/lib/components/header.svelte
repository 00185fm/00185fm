<script>
	import { AppBar } from '@skeletonlabs/skeleton';
</script>

<AppBar background="bg-transparent">
	<svelte:fragment slot="lead">
		<a href="/">
			<img src="/img/00185fm_logo200px.png" alt="00185fm Logo" />
		</a>
	</svelte:fragment>
	<svelte:fragment slot="trail">
		<a href="/archives">/archives</a>
		<a href="/shows">/shows</a>
		<a href="/about">/about</a>
	</svelte:fragment>
</AppBar>
