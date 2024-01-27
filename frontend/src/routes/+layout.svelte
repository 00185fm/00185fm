<script lang="ts">
	import '../app.postcss';
	import Transitions from '$lib/layout/transitions.svelte';
	import Header from '$lib/layout/header.svelte';
	import Sidebar from '$lib/layout/sidebar.svelte';

	import Footer from '$lib/layout/footer.svelte';
	import About from '$lib/components/about.svelte';
	let about_open: boolean = false;
	export let data;
	const { init_np, projects, schedules } = data;
	const radio_infos = projects.find((p) => p.name === '00185fm');
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<Transitions />
	<Header bind:about_open {radio_infos} />

	<Sidebar {schedules} />

	<main class="no-scrollbar flex-1 overflow-y-scroll">
		{#if about_open}
			<About {projects} />
		{/if}
		<slot />
	</main>
	<Footer {init_np} />
</div>
