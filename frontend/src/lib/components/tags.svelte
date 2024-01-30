<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import Chip from './chip.svelte';
	import { queryParam } from 'sveltekit-search-params';
	import { filter } from '$lib/utility/stores';
	import { onMount } from 'svelte';

	export let tags: RecordModel[];

	type tags_buttons_type = {
		tag: RecordModel;
		active: boolean;
	};

	let tags_buttons: tags_buttons_type[] = [];

	const t_query = queryParam('t', {
		encode: (value: string[]) => value.join(','), // Join the array into a comma-separated string
		decode: (value: string | null) => (value ? value.split(',') : []) // Split the string into an array
	});

	const findSelectedTags = (tag: string): boolean => {
		if (!$t_query) return false;
		let res: boolean = $t_query.find((t) => t === tag) ? true : false;
		return res;
	};

	function addTag(tag: string, episodes: string) {
		if (!$t_query) return;
		$t_query = [...$t_query, tag];
		const toAdd: string[] = episodes
			.split(',')
			.map((e) => {
				if (!$filter.items.includes(e)) return e;
				else return '';
			})
			.filter((e) => e !== '');
		if (toAdd) {
			$filter = {
				active: true,
				items: [...$filter.items, ...toAdd]
			};
		}
	}
	function removeTag(tag: string, episodes: string) {
		if (!$t_query) return;
		$t_query = $t_query.filter((t) => t !== tag);

		if ($t_query.length === 0) {
			$t_query = null;
			$filter = {
				active: false,
				items: []
			};
		} else if (episodes !== '') {
			$filter = {
				active: true,
				items: $filter.items.filter((item) => !episodes.split(',').includes(item))
			};
		}
	}

	onMount(() => {
		if ($t_query) {
			$filter = {
				active: true,
				items: [...$filter.items]
			};
		}
	});
	tags.forEach((tag) => {
		tags_buttons.push({
			tag: tag,
			active: findSelectedTags(tag.tag)
		});
	});
</script>

<div class="no-scrollbar h-28 overflow-x-scroll p-4 lg:h-full lg:w-[50%] lg:overflow-y-scroll">
	{#each tags_buttons as { tag, active }}
		<Chip
			on:click={() =>
				findSelectedTags(tag.tag)
					? (removeTag(tag.tag, tag.episodes), (active = false))
					: (addTag(tag.tag, tag.episodes), (active = true))}
			text={tag.tag}
			padding="px-2 m-2 mt-1"
			c_class="uppercase text-xs"
			bind:active
		>
			<span>{tag.tag}</span>
		</Chip>
	{/each}
</div>
