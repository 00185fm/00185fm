<script lang="ts">
	import Button from '$lib/components/button.svelte';
	import Searchbar from '$lib/components/searchbar.svelte';
	export let about_open: boolean = false;
</script>

<header class="z-30 h-28 w-full p-4 lg:p-10">
	<div class="flex items-center justify-between">
		<div class="flex items-center justify-center">
			<a href="/" class="h-full w-full min-w-[150px] max-w-fit">
				<img
					src="/img/00185fm_logo200px.png"
					alt="00185fm logo"
					class="hover:shadow-black hover:drop-shadow-2xl"
				/>
			</a>
			<Button text={'telegram'} url={'/'} c_class="hidden lg:block" />
			<Button text={'support us'} url={'/'} c_class="hidden lg:block" />
		</div>
		<div class="flex items-center justify-center">
			<div class="block lg:flex">
				<a href="/archive" class="font-basteleur pr-2 lg:pr-32 lg:text-lg">/archive</a>
				<button
					on:click={() => (about_open = !about_open)}
					class="font-basteleur cursor-pointer pr-2 lg:pr-24 lg:text-lg">/about</button
				>
			</div>
			<Searchbar />
		</div>
	</div>
</header>
