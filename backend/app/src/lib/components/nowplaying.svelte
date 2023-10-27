<script lang="ts">
	import { enhance } from '$app/forms';
	import { PUBLIC_RADIO_URL } from '$env/static/public';
	import type { nptype } from '$lib/utility/types';
	import type { ActionData } from '../../routes/$types';

	export let np: nptype;
	export let form: ActionData;

	import { clipboard, getToastStore, type ToastSettings } from '@skeletonlabs/skeleton';
	const toastStore = getToastStore();

	const tSkip: ToastSettings = {
		message: 'Track successfully skipped! 🎉',
		background: 'variant-ghost-primary',
		timeout: 2000,
		hoverable: true
	};
	$: {
		if (form?.success === true) {
			toastStore.trigger(tSkip);
		}
	}
	let copied = false;

	function onClickHandler(): void {
		copied = true;
		setTimeout(() => {
			copied = false;
		}, 1000);
	}
</script>

<div class="card variant-glass-primary">
	<header class="card-header text-center">
		<p class="h2">Now Playing</p>
	</header>
	<section class="p-4 card variant-outline-primary m-4">
		<div class="text-center sm:text-left sm:flex sm:justify-between">
			<div>
				<p><span class="font-bold">Title: </span>{np.title}</p>
				<p><span class="font-bold">Artist: </span>{np.artist}</p>
				{#if !np.is_live}
					<a href={'/shows/' + np.slug} class="btn variant-ghost-primary capitalize p-2 m-2"
						>Go to episode!</a
					>
				{/if}
			</div>
			<div class="grid grid-cols-1 space-y-2">
				{#if !np.is_live}
					<form method="POST" use:enhance>
						<button class="btn variant-filled-primary" type="submit" formaction="?/nextsong"
							>Skip Current</button
						>
					</form>
				{:else}
					<button class="btn variant-filled-primary animate-pulse">Live Streaming</button>
				{/if}
				<button
					use:clipboard={PUBLIC_RADIO_URL}
					class="btn variant-filled"
					on:click={onClickHandler}
					disabled={copied}
				>
					{copied ? 'Copied 👍' : 'Copy Stream Link'}
				</button>
			</div>
		</div>
	</section>
	<footer class="card-footer space-y-4">
		<audio controls src={PUBLIC_RADIO_URL} class="w-full" />
	</footer>
</div>
