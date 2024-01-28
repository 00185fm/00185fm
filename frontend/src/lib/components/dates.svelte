<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	export let dates: RecordModel[];
	import Chip from './chip.svelte';
</script>

<div
	class="no-scrollbar order-first overflow-x-scroll p-4 lg:order-last lg:w-[50%] lg:overflow-x-scroll"
>
	<div class="grid w-max grid-flow-col gap-8">
		{#each dates as year}
			<div class="grid grid-flow-col gap-2.5 lg:grid-flow-row">
				<span class="text-stroke font-basteleur text-2xl">{year.year}</span>
				{#each year.months as month}
					<Chip
						text={new Date(month.month).toLocaleString('default', { month: 'short' })}
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
