<script lang="ts">
	import type { RecordModel } from 'pocketbase';
	import Player from '$lib/components/player/player.svelte';
	export let init_np: RecordModel;
</script>

<footer class="z-30 h-40 w-full border-t border-black text-center">
	<Player {init_np} />
</footer>
