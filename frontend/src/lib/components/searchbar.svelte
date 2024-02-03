<script lang="ts">
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { filters } from '$lib/utility/stores';
	import { fetchAllRecords } from '$lib/utility/utility';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	import { queryParam } from 'sveltekit-search-params';

	let img: HTMLImageElement;
	let width = 0;
	let height = 0;

	let episode_ids: RecordModel[];
	const q_param = queryParam('q');

	onMount(() => {
		width = img.width;
		height = img.height;
	});

	let searchbox: HTMLInputElement;
	let input: string = $q_param ? $q_param : '';
	$: {
		if (browser && searchbox) {
			searchbox.onkeydown = (e) => {
				if (e.code === 'Enter') {
					search_store();
					if ($page.route.id !== '/archive') {
						goto(`/archive?q=${input}`);
					} else {
						$q_param = input;
					}
				}
			};
		}
	}
	const search_store = async () => {
		const text = input.toLowerCase();
		episode_ids = await fetchAllRecords(
			'episodes',
			'-date',
			'',
			`title ?~ "${text}" || author ?~ "${text}" || description ?~ "${text}" || show.title ?~ "${input}" || show.author ?~ "${input}"`,
			'id'
		);
		$filters = {
			active: true,
			episode_ids: [...episode_ids.map((e) => e.id)]
		};
	};

	$: {
		if (input === '') {
			$q_param = null;
			$filters = { active: false, episode_ids: [] };
		}
	}
</script>

<div class="relative h-12">
	<img bind:this={img} class="border-img" src="/img/search_box.svg" alt="Search Box" />
	<div class="flex h-full items-center justify-center pl-4">
		<img class="inline-block" src="/img/search_icon.svg" alt="Search Icon" />
		<input
			bind:this={searchbox}
			bind:value={input}
			id="searchbox"
			name="searchbox"
			type="text"
			class="searchbox inline-block h-full max-w-44 pl-2 pr-4 font-basteleur"
			placeholder="Search.."
		/>
	</div>
</div>

<style>
	.border-img {
		z-index: 0;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
	}

	.searchbox {
		outline: none !important;
		position: relative;
		z-index: 20;
		background-color: transparent;
	}
</style>
