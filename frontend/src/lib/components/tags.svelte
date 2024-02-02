<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import Chip from './chip.svelte';
	import { queryParam, queryParameters } from 'sveltekit-search-params';
	import type { tag_filter_type } from '$lib/utility/types';
	import { filters } from '$lib/utility/stores';
	export let tags: RecordModel[];
	let active_classes = 'outline-red-500 bg-pink-50';
	const t_param = queryParam('t', {
		encode: (value: string[]) => value.join(','), // Join the array into a comma-separated string
		decode: (value: string | null) => (value ? value.split(',') : []) // Split the string into an array
	});
	const all_params = queryParameters({
		d: true
	});
	let tags_filter: tag_filter_type[] = [];

	tags.forEach((tag) => {
		tags_filter.push({
			tag: tag.tag,
			episodes: tag.count > 0 ? tag.episodes.split(',') : [],
			active: $t_param?.find((t) => t === tag.tag) ? true : false
		});
		if ($t_param?.find((t) => t === tag.tag) ? true : false) {
			$filters = {
				active: true,
				episode_ids: [...$filters.episode_ids, ...tag.episodes.split(',')]
			};
		}
	});

	function cleanFilters() {
		tags_filter = tags_filter.map((t) => {
			t.active = false;
			return t;
		});
		$t_param = null;

		if (!$all_params.d) {
			$filters = { active: false, episode_ids: [] };
		}
	}

	function handleTag(active: boolean, tag: string, episodes: string[]) {
		if (!$t_param) return;

		if (!active) {
			///// ADD

			$t_param = [...$t_param, tag];
			const newEpisodeIds = episodes.filter((id) => !$filters.episode_ids.includes(id)); // check duplicates
			$filters = { active: true, episode_ids: [...$filters.episode_ids, ...newEpisodeIds] };
		} else {
			///// REMOVE
			$t_param = $t_param.filter((t) => t !== tag);

			const clean_filters: string[] = $filters.episode_ids?.filter((id) => {
				// Check if the episode ID is contained in any active tags_filter.episodes
				const isContainedInActiveTags = tags_filter.some(
					(tagFilter) => tagFilter.active && tagFilter.episodes.includes(id)
				);

				// Include the episode ID in clean_filters if it is contained in any active tags_filter.episodes
				return isContainedInActiveTags;
			});

			if ($t_param.length === 0) {
				////// CLEANUP
				cleanFilters();
			} else {
				$filters = { active: true, episode_ids: [...clean_filters] };
			}
		}
	}
</script>

<div class="no-scrollbar h-28 overflow-x-scroll p-4 lg:h-full lg:w-[50%] lg:overflow-y-scroll">
	{#each tags_filter as { tag, active, episodes }}
		<Chip>
			<button
				on:click={() => {
					active = !active;
					handleTag(active, tag, episodes);
				}}
				class={`m-2 mt-1 h-[23px] w-fit rounded-3xl bg-slate-100 px-2 text-xs uppercase outline outline-1 ${active ? active_classes : 'outline-black '}`}
			>
				{tag}
			</button>
		</Chip>
	{/each}
</div>
