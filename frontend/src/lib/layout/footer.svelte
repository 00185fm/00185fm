<script lang="ts">
	import Player from '$lib/components/player/player.svelte';
	import { playing_archive } from '$lib/utility/stores';
	import Timeline from '$lib/components/player/timeline.svelte';
</script>

{#if $playing_archive}
	<Timeline />
{/if}
<footer class="z-30 h-40 w-full border-t border-black text-center">
	<Player />
</footer>
