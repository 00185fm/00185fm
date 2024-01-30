<script lang="ts">
	import { dateFormat, fetchAllRecords, handleArchivePlay } from '$lib/utility/utility';
	import Image from '../image.svelte';
	import { queryParam } from 'sveltekit-search-params';
	import Chip from '../chip.svelte';
	import MoreEpisodes from '../cards/moreEpisodes.svelte';
	import { selected_episode, showModal } from '$lib/utility/stores';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	let dialog: HTMLDialogElement;
	let related_episodes: RecordModel[] = [];

	const e_query = queryParam('e');

	$: if (dialog && $showModal) dialog.showModal();

	onMount(async () => {
		try {
			related_episodes = await fetchAllRecords(
				'episodes',
				'-date',
				'show,tags',
				`show="${$selected_episode?.show}" && public=true`
			);
		} catch (error) {
			console.log(error);
		}
	});
</script>

<!-- svelte-ignore a11y-click-events-have-key-events a11y-no-noninteractive-element-interactions -->
<dialog
	class="no-scrollbar w-screen rounded-xl px-4 lg:px-16"
	bind:this={dialog}
	on:close={() => {
		$showModal = false;
		$selected_episode = undefined;
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
	<div class="grid grid-flow-row gap-5 font-myriad lg:grid-cols-2 lg:gap-10">
		<div id="left" class="order-last lg:order-first">
			<slot name="header">
				<div
					class="border_b_radius bg_fog grid w-full grid-rows-3 rounded-full px-3 font-sans lg:grid-cols-3 lg:grid-rows-1"
				>
					<span
						class="flex h-full w-full items-center justify-center border-b border-dotted border-black px-2 text-2xl lg:justify-start lg:border-b-0 lg:border-r"
						>{$selected_episode?.title}</span
					>
					<span
						class="flex h-full w-full items-center justify-center border-b border-dotted border-black px-2 text-2xl lg:justify-start lg:border-b-0 lg:border-r"
						>{$selected_episode?.author}</span
					>
					<span class="flex h-full w-full items-center justify-center px-2 text-2xl lg:justify-end"
						>{$selected_episode?.expand?.show.title}</span
					>
				</div>
			</slot>
			<slot name="content">
				<div class="grid grid-cols-2 overflow-hidden pt-4">
					<span
						id="description"
						class="no-scrollbar max-h-[710px] overflow-y-scroll p-2 pb-5 text-justify font-myriad text-xl"
					>
						{@html $selected_episode?.description}
					</span>
					<span
						id="tracklist"
						class="no-scrollbar max-h-[710px] overflow-y-scroll p-2 pb-5 text-right font-sans text-xl"
					>
						{@html $selected_episode?.tracklist
							? $selected_episode?.tracklist
							: 'No tracklist provided'}
					</span>
				</div>
			</slot>
		</div>
		<div id="right" class="order-first space-y-3 lg:order-last">
			<slot name="image">
				<Image />
			</slot>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-5 pt-3 align-top lg:gap-10">
		<div class="border_b_radius -mt-12 flex items-center justify-between px-8 pb-5">
			<button
				disabled={Boolean(!$selected_episode?.audio)}
				class="text-5xl focus:outline-none disabled:cursor-not-allowed disabled:text-gray-400"
				on:click={handleArchivePlay}>PLAY</button
			>
			<div>
				{#if $selected_episode?.expand?.tags}
					{#each $selected_episode?.expand?.tags as tag, i}
						{#if i < 4}
							<Chip text={tag.tag} padding="px-2 m-2 mt-1" c_class="uppercase text-xs" />
						{/if}
					{/each}
				{/if}
			</div>
		</div>
		<div class="flex h-fit w-full justify-between rounded-full border border-black px-2">
			<span class="px-4 text-2xl">{dateFormat($selected_episode?.date, true)}</span>
			<span class="px-4 text-2xl"
				>{$selected_episode?.credits
					? $selected_episode?.credits
					: 'No artwork credits provided'}</span
			>
		</div>
	</div>
	<MoreEpisodes {related_episodes} />
</dialog>

<style>
	dialog {
		background: transparent;
		outline: none;
	}
	dialog::backdrop {
		background: rgba(255, 255, 255, 0.75);
	}
	.border_b_radius {
		border-radius: 18px;
		border-bottom: 1px solid #000;
	}
	.bg_fog {
		box-shadow: -5px -10px 20px white;
		background: rgba(255, 255, 255, 0.848);
	}
</style>
