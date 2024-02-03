<script lang="ts">
	import '../app.postcss';
	import Transitions from '$lib/layout/transitions.svelte';
	import Header from '$lib/layout/header.svelte';
	import Sidebar from '$lib/layout/sidebar.svelte';
	import Sidebar2 from '$lib/layout/sidebar2.svelte';

	import Footer from '$lib/layout/footer.svelte';
	import About from '$lib/components/about.svelte';
	import { np } from '$lib/utility/stores';
	let about_open: boolean = false;
	export let data;
	const { init_np, projects, schedules } = data;
	const radio_infos = projects.find((p) => p.name === '00185fm');
	$np = init_np;
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<Transitions />
	<Header bind:about_open {radio_infos} />

	<Sidebar {schedules} />

	<!-- <Sidebar2 {schedules} /> -->
	<main class="no-scrollbar flex-1 overflow-y-scroll">
		{#if about_open}
			<About {projects} />
		{/if}
		<slot />
	</main>
	<Footer />
</div>
