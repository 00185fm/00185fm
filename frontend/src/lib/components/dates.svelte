<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	export let dates: RecordModel[];
	import Chip from './chip.svelte';
	import { filters } from '$lib/utility/stores';
	import { queryParam, queryParameters } from 'sveltekit-search-params';
	import { onMount } from 'svelte';
	let active_classes = 'outline-red-500 bg-pink-50';

	const all_params = queryParameters({
		t: true
	});

	const d_param = queryParam('d', {
		encode: (value: string[]) => value.join(','), // Join the array into a comma-separated string
		decode: (value: string | null) => (value ? value.split(',') : []) // Split the string into an array
	});

	const dates_filters: string[] = [];
	for (const entry of dates) {
		for (const monthEntry of entry.months) {
			monthEntry.active = $d_param?.find((d) => d === `${monthEntry.month}_${entry.year}`)
				? true
				: false;
			if (monthEntry.active) dates_filters.push(...JSON.parse(monthEntry.episodes));
		}
	}
	onMount(() => {
		if ($d_param && $d_param?.length > 0) {
			$filters = { active: true, episode_ids: dates_filters };
		}
	});

	function cleanFilters() {
		dates = dates.map((entry) => ({
			...entry,
			months: entry.months.map((monthEntry: any) => ({ ...monthEntry, active: false }))
		}));
		$d_param = null;

		if ($all_params.t === null) {
			$filters = { active: false, episode_ids: [] };
		}
	}

	function handleDate(active: boolean, episode_ids: string, date: string) {
		if (!$d_param) return;
		const ids: string[] = JSON.parse(episode_ids);
		if (active) {
			$d_param = [...$d_param, date];
			$filters.active = true;
			$filters.episode_ids = [...$filters.episode_ids, ...ids];
		} else {
			$d_param = $d_param.filter((d) => date !== d);
			$filters.episode_ids = $filters.episode_ids.filter((id) => ids.indexOf(id) === -1);
			if ($d_param.length === 0) {
				cleanFilters();
			}
		}
	}
</script>

<div
	class="no-scrollbar order-first overflow-x-scroll p-4 lg:order-last lg:w-[50%] lg:overflow-x-scroll"
>
	<div class="grid w-max grid-flow-col gap-8">
		{#each dates as year}
			<div class="grid grid-flow-col gap-2.5 lg:grid-flow-row">
				<span class="text-stroke font-basteleur text-2xl">{year.year}</span>
				{#each year.months as month}
					<Chip>
						<button
							on:click={() => {
								if (!month.active) {
									month.active = true;
									handleDate(month.active, month.episodes, `${month.month}_${year.year}`);
								} else {
									month.active = false;
									handleDate(month.active, month.episodes, `${month.month}_${year.year}`);
								}
							}}
							class={`w-fit justify-center rounded-3xl bg-transparent p-2 font-basteleur text-xl lowercase outline-dashed outline-1 ${month.active ? active_classes : 'outline-black'}`}
						>
							{new Date(year.year, month.month - 1).toLocaleString('default', { month: 'short' })}
						</button>
					</Chip>
				{/each}
			</div>
		{/each}
	</div>
</div>
