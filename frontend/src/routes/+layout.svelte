<script lang="ts">
	import '../app.postcss';
	import Transitions from '$lib/layout/transitions.svelte';
	import Header from '$lib/layout/header.svelte';
	import Sidebar from '$lib/layout/sidebar.svelte';
	import Footer from '$lib/layout/footer.svelte';
	import About from '$lib/components/about.svelte';
	let about_open: boolean = false;
	export let data;
	const { init_np } = data;
</script>

<div class="flex h-screen flex-col overflow-hidden">
	<Transitions />
	<Header bind:about_open />
	<Sidebar />
	<main class="no-scrollbar flex-1 overflow-y-scroll">
		{#if about_open}
			<About />
		{/if}
		<slot />
	</main>
	<Footer {init_np} />
</div>
