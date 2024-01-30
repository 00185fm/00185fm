<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	export let dates: RecordModel[];
	import Chip from './chip.svelte';
	import { dateFormat, slugify } from '$lib/utility/utility';
	import { queryParam } from 'sveltekit-search-params';
	const d_query = queryParam('d', {
		encode: (value: string[]) => value.join(','), // Join the array into a comma-separated string
		decode: (value: string | null) => (value ? value.split(',') : []) // Split the string into an array
	});

	function handleMonthSelect(year: number, month: number) {
		if (!$d_query) return;
		const date = new Date().setFullYear(year, month, 1);
		// $d_query = [...$d_query, slugify(dateFormat(new Date(date).toISOString(), false))];
		console.log($d_query, slugify(dateFormat(new Date(date).toISOString(), false)));
	}

	// const findSelectedDates = (date: string): boolean => {
	// 	if (!$d_query) return false;
	// 	let res: boolean = $d_query.find((t) => t === date) ? true : false;
	// 	return res;
	// };

	// function addDate(date: string) {
	// 	if (!$d_query) return;
	// 	$d_query = [...$d_query, date];
	// }
	// function removeDate(date: string) {
	// 	if (!$d_query) return;
	// 	$d_query = $d_query.filter((t) => t !== date);
	// 	if ($d_query.length === 0) {
	// 		$d_query = null;
	// 	}
	// }
</script>

<div
	class="no-scrollbar order-first overflow-x-scroll p-4 lg:order-last lg:w-[50%] lg:overflow-x-scroll"
>
	<div class="grid w-max grid-flow-col gap-8">
		{#each dates as year}
			<div class="grid grid-flow-col gap-2.5 lg:grid-flow-row">
				<span class="text-stroke font-basteleur text-2xl">{year.year}</span>
				{#each year.months as { month }}
					<Chip
						on:click={() => handleMonthSelect(year.year, month)}
						text={dateFormat(month, false, false)}
						outline="outline-dashed outline-1 outline-black"
						padding="p-2 justify-center"
						size="w-fit"
						c_class="text-xl lowercase"
						bg_color="transparent"
						font="font-basteleur"
					/>
				{/each}
			</div>
		{/each}
	</div>
</div>

<!-- 
<div
	class="no-scrollbar order-first overflow-x-scroll p-4 lg:order-last lg:w-[50%] lg:overflow-x-scroll"
>
	<div class="grid w-max grid-cols-4 gap-8">
		{#each { length: 4 } as _, year}
			<div class="grid grid-flow-col gap-2.5 lg:grid-flow-row">
				<span class="text-stroke font-basteleur text-2xl">{'202' + (year + 1)}</span>
				{#each { length: 12 } as _, month}
					<Chip
						text={'jan' + (month + 1)}
						outline="outline-dashed outline-1 outline-black"
						padding="p-2 justify-center"
						size="w-fit"
						c_class="text-xl"
						bg_color="transparent"
						font="font-basteleur"
					/>
				{/each}
			</div>
		{/each}
	</div>
</div> -->
