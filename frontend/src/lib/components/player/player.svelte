<script lang="ts">
	import { pb } from '$lib/pocketbase';
	import type { RecordModel } from 'pocketbase';
	import { PUBLIC_NP_ID } from '$env/static/public';
	import { onDestroy, onMount } from 'svelte';
	import { fetchRecord } from '$lib/utility/utility';
	import Volume from './volume.svelte';
	import Playpause from './playpause/playpause.svelte';
	import Audio from './audio.svelte';
	import SmartCard from '../smartCard.svelte';
	import PlayerInfo from './playerInfo.svelte';
	export let init_np: RecordModel;

	let np: RecordModel = init_np;
	let episode: RecordModel = {
		collectionId: '',
		collectionName: '',
		id: '',
		created: '',
		updated: '',
		expand: {
			episode: {
				title: ''
			}
		}
	};

	onMount(async () => {
		episode = np.expand?.episode;
		pb.collection('nowplaying').subscribe(PUBLIC_NP_ID, async function ({ action }) {
			if (action === 'update') {
				np = await fetchRecord(PUBLIC_NP_ID, 'nowplaying');
				episode = np.expand?.episode;
			}
		});
	});
	onDestroy(() => {
		pb.collection('nowplaying').unsubscribe(PUBLIC_NP_ID);
	});
</script>

<div class="grid h-full grid-cols-4">
	<div class="col-span-3 w-full" class:text-red-500={np.is_live}>
		<Audio />
		<div class="grid h-full grid-cols-10">
			<div class="col-span-1 inline-flex h-full w-full items-center justify-center">
				<Playpause />
			</div>

			<PlayerInfo {np} {episode} />

			<Volume />
		</div>
	</div>

	<SmartCard {np} {episode} />
</div>
