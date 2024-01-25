<script lang="ts">
	import { SlideToggle } from '@skeletonlabs/skeleton';
	type lstype = {
		url: string;
		mount: string;
		port: string;
		password: string;
	};
	export let livestream: lstype;
	let show_pass: boolean = false;
</script>

<div class="card variant-ghost-surface">
	<header class="card-header text-center">
		<h2 class="h2">Livestream Setup</h2>
	</header>
	<section class="p-4">
		<div class="card text-center variant-outline-primary p-2">
			<p><span class="font-bold">Url:</span> {livestream.url}</p>
			<p><span class="font-bold">Port:</span> {livestream.port}</p>
			<p><span class="font-bold">Mountpoint:</span> {livestream.mount}</p>
			<p><span class="font-bold">User:</span> source</p>
			{#if show_pass}
				<p>
					<span class="font-bold"> Password:</span>
					{livestream.password}
				</p>
			{/if}
			<SlideToggle name="password" bind:checked={show_pass} size="sm">Show Password</SlideToggle>
		</div>
	</section>
	<footer class="card-footer">
		<div class="text-center space-y-4">
			<p class="sm:flex sm:justify-center w-full">
				You can use any <span class="font-bolt text-red-500 px-1">Icecast 2</span> compatible software
				to stream content.
			</p>
			<p class="flex justify-center">
				Your ID3v2 Mp3 metadata will be used after the live initialization.
			</p>
			<div class="flex justify-center gap-2">
				<a class="btn variant-ghost-primary p-2" href="https://mixxx.org/" target="_blank">Mixxx</a>
				<a
					class="btn variant-ghost-secondary p-2"
					href="https://danielnoethen.de/butt/"
					target="_blank">Butt</a
				>
			</div>
		</div>
	</footer>
</div>
