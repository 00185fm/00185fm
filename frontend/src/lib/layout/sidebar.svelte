<script lang="ts">
	import type { all_schedules } from '$lib/utility/types';
	import { dateFormat, fetchAllRecords, hourFormat } from '$lib/utility/utility';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	export let schedules: RecordModel[] = [];
	import { fly } from 'svelte/transition';
	export let width: number = 150;
	export let open: boolean = false;
	let full_schedules: all_schedules[] = [];

	onMount(async () => {
		for await (const schedule of schedules) {
			const scheduled_items = await fetchAllRecords(
				'scheduled_items',
				'date',
				'',
				`schedule = "${schedule.id}"`
			);
			full_schedules.push({
				info: schedule.info,
				date: schedule.date,
				scheduled_items: scheduled_items
			});
		}
	});
</script>

<button on:click={() => (open = !open)} class="fixed right-0 z-10 hidden h-full lg:block">
	<div class:schedule={open} class="flex h-[600px] items-center justify-start rounded-3xl">
		<span class="-rotate-90 font-basteleur text-3xl">SCHEDULE</span>
		{#if open}
			<div
				bind:clientWidth={width}
				transition:fly={{ x: width }}
				class="no-scrollbar max-h-full overflow-y-scroll pr-20"
			>
				{#each full_schedules as schedule}
					<div class="h-full w-full pb-5">
						<div class="flex justify-between pb-2">
							<p class="font-basteleur text-3xl uppercase shadow-black drop-shadow-xl">
								{dateFormat(schedule.date, true, false)}
							</p>
							<p class="font-picnic uppercase">{schedule.info}</p>
						</div>
						<hr class="h-0.5 bg-black" />
						<div class="pt-5">
							{#each schedule.scheduled_items as item}
								<div class="grid grid-cols-6 gap-4 align-middle">
									<p class="col-span-2 text-right font-basteleur leading-loose">
										{hourFormat(item.date)}
									</p>
									<p class="col-span-4 text-left leading-relaxed">{item.title} - {item.artist}</p>
								</div>
							{/each}
						</div>
					</div>
				{/each}
			</div>
		{/if}
	</div>
</button>

<style>
	.schedule {
		background-color: rgba(245, 245, 245, 0.954);
		-webkit-box-shadow: -23px 0px 50px 26px whitesmoke;
		box-shadow: -23px 0px 50px 26px whitesmoke;
	}
</style>
