<script lang="ts">
	import BcLogo from '$lib/icons/logos/bc_logo.svelte';
	import EmailLogo from '$lib/icons/logos/email_logo.svelte';
	import YtLogo from '$lib/icons/logos/yt_logo.svelte';
	import FbLogo from '$lib/icons/logos/fb_logo.svelte';
	import IgLogo from '$lib/icons/logos/ig_logo.svelte';

	import type { RecordModel } from 'pocketbase';
	export let projects: RecordModel[];
</script>

<div class="absolute -left-36 top-0 grid w-fit grid-cols-1 text-right">
	{#each projects as project}
		<p class="font-basteleur text-xl">{project.name}</p>
		<div class="w-full align-middle">
			{#if project.bandcamp}
				<a class="inline-block" href={project.bandcamp} target="_blank"><BcLogo /></a>
			{/if}
			{#if project.youtube}
				<a class="inline-block" href={project.youtube} target="_blank"><YtLogo /></a>
			{/if}
			{#if project.facebook}
				<a class="inline-block" href={project.facebook} target="_blank"><FbLogo /></a>
			{/if}
			{#if project.instagram}
				<a class="inline-block" href={project.instagram} target="_blank"><IgLogo /></a>
			{/if}
			{#if project.email}
				<a class="inline-block" href={'mailto:' + project.email} target="_blank"><EmailLogo /></a>
			{/if}
		</div>
	{/each}
</div>
