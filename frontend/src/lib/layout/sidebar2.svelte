<script lang="ts">
	import { Drawer } from 'vaul-svelte';
	import type { all_schedules } from '$lib/utility/types';
	import { dateFormat, fetchAllRecords, hourFormat } from '$lib/utility/utility';
	import type { RecordModel } from 'pocketbase';
	import { onMount } from 'svelte';
	export let schedules: RecordModel[] = [];
	let full_schedules: all_schedules[] = [];

	// init dialogue
	let dialogOpen = false;
	let activeSnapPoint: number = 0.1;
	$: console.log(activeSnapPoint, dialogOpen);

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

<Drawer.Root bind:activeSnapPoint bind:open={dialogOpen} snapPoints={[0.1, 0.4]} direction="right">
	<Drawer.Trigger>Open Drawer</Drawer.Trigger>
	<Drawer.Portal>
		<!-- <Drawer.Overlay class="fixed inset-0 bg-black/40" /> -->
		<Drawer.Content
			class="fixed bottom-0 right-0 top-0 z-50 m-auto flex max-h-[65%] w-full flex-col rounded-bl-[10px] rounded-tl-[10px] bg-white focus:outline-none"
		>
			<div
				class="no-scrollbar flex max-w-[40%] flex-col overflow-auto rounded-bl-[10px] rounded-tl-[10px] px-10 py-4"
			>
				{#each full_schedules as schedule}
					<div class="h-full w-full pt-5">
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
		</Drawer.Content>
	</Drawer.Portal>
</Drawer.Root>
