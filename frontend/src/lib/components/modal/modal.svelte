<script lang="ts">
	import { PUBLIC_DEFAUL_ART, PUBLIC_DEFAUL_ART_20 } from '$env/static/public';
	import { dateFormat, file_url } from '$lib/utility/utility';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import { queryParam } from 'sveltekit-search-params';
	const e_query = queryParam('e');
	export let showModal: boolean = false; // boolean
	export let episode: RecordModel | undefined;

	let dialog: HTMLDialogElement; // HTMLDialogElement
	$: url = PUBLIC_DEFAUL_ART;
	$: url_small = PUBLIC_DEFAUL_ART_20;
	let header_bar: string =
		'flex w-full justify-between rounded-full p-2 outline outline-1 outline-black';

	$: if (dialog && showModal) dialog.showModal();

	onMount(() => {
		if (episode?.image !== '') {
			url = file_url(String(episode?.id), episode?.image, '?thumb=1000x1000');
			url_small = file_url(String(episode?.id), episode?.image, '?thumb=20x20');
		}
	});
	let img: HTMLImageElement;
	let img_small: HTMLDivElement;
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="no-scrollbar w-screen rounded-xl p-2 lg:p-10"
	bind:this={dialog}
	on:close={() => {
		showModal = false;
		episode = undefined;
	}}
	on:keydown={(e) => {
		if (e.key === 'Escape' || e.key === 'Esc') {
			$e_query = null;
			dialog.close();
		}
	}}
	on:click|self={() => {
		$e_query = null;
		dialog.close();
	}}
>
	<div class="font-myriad grid grid-flow-row gap-5 lg:grid-cols-2 lg:gap-10">
		<div id="right" class="order-last lg:order-first">
			<slot name="header">
				<div class="{header_bar} header_bar">
					<span class="px-4 text-2xl font-bold">{episode?.title}</span>
					<span class="px-2 text-2xl">{episode?.author}</span>
					<span class="px-4 text-2xl font-bold">{episode?.expand?.show.title}</span>
				</div>
			</slot>
			<slot name="content">
				<div class="pt-4">
					<span id="description" class="pt-4 text-justify text-lg lg:text-right">
						{@html episode?.description}
					</span>
					<div id="tags" class="pt-2">
						{#if episode?.expand?.tags}
							{episode?.expand?.tags.tag}
						{:else}
							<p>no tags found</p>
						{/if}
					</div>
				</div>
			</slot>
		</div>
		<div id="left" class="order-first space-y-3 lg:order-last">
			<slot name="image">
				<div class="aspect-1 relative">
					<div
						bind:this={img_small}
						class="blur-load absolute left-0 top-0 h-full w-full rounded-3xl bg-center opacity-100"
						style={`background-image: url(${url_small})`}
					>
						<img
							bind:this={img}
							id="card-image"
							on:load={() => {
								img.classList.remove('opacity-0');
								img.classList.add('opacity-100');
							}}
							src={url}
							alt="Episode Card"
							class="absolute left-0 top-0 w-full rounded-3xl object-contain opacity-0 transition-opacity duration-200 ease-in-out"
							loading="lazy"
						/>
					</div>
				</div>

				<div class="{header_bar} header_bar w-full">
					<span class="px-4 text-2xl">{dateFormat(episode?.date)}</span>
					<span class="px-4 text-2xl">Artwork Credits</span>
				</div>
			</slot>
		</div>
	</div>
</dialog>

<style>
	dialog {
		background: transparent;
		outline: none;
	}
	dialog::backdrop {
		background: rgba(255, 255, 255, 0.75);
	}
	.header_bar {
		background: rgba(255, 255, 255, 0.848);
	}
	.blur-load {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
