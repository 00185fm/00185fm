<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import { PUBLIC_NP_ID } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import Volume from './volume.svelte';
	import Playpause from './playpause/playpause.svelte';
	import Audio from './audio.svelte';
	import SmartCard from '../smartCard.svelte';
	import PlayerInfo from './playerInfo.svelte';
	import { np } from '$lib/utility/stores';
	onMount(async () => {
		pb.collection('nowplaying').subscribe(
			PUBLIC_NP_ID,
			async function ({ action, record }) {
				if (action === 'update') {
					$np = record;
				}
			},
			{
				expand: 'episode, episode.tags'
			}
		);
	});
	onDestroy(() => {
		pb.collection('nowplaying').unsubscribe(PUBLIC_NP_ID);
	});
</script>

<div class="grid h-full grid-cols-3 lg:grid-cols-4">
	<div class="col-span-3 w-full" class:text-red-500={$np?.is_live}>
		<Audio />
		<div class="grid h-full grid-cols-8 lg:grid-cols-10">
			<div class="col-span-1 inline-flex h-full w-full items-center justify-center">
				<Playpause />
			</div>

			<PlayerInfo />

			<Volume />
		</div>
	</div>

	<SmartCard />
</div>
