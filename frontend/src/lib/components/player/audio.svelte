<script context="module" lang="ts">
	export let player: HTMLAudioElement;
</script>

<script lang="ts">
	import { PUBLIC_RADIO_URL } from '$env/static/public';
</script>

<audio preload="auto" src={PUBLIC_RADIO_URL} bind:this={player} />
