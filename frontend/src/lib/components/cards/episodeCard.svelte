<script lang="ts">
	import { env } from '$env/dynamic/public';
	import { file_url, slugify } from '$lib/utility/utility';
	import type { RecordModel } from 'pocketbase';
	import { queryParam } from 'sveltekit-search-params';
	const e_query = queryParam('e');

	export let episode: RecordModel;
	export let selected_episode;
	export let showModal = false;
	let url = env.PUBLIC_DEFAUL_ART_300;
	let url_small = env.PUBLIC_DEFAUL_ART_20;
	$: {
		if (episode.image !== '') {
			url = file_url(episode.id, episode.image, '?thumb=300x300', episode.collectionName);
			url_small = file_url(episode.id, episode.image, '?thumb=20x20', episode.collectionName);
		}
	}
	let img: HTMLImageElement;
	let img_small: HTMLDivElement;
</script>

<button
	id={'e_' + episode.id}
	on:click={() => {
		selected_episode = episode;
		showModal = true;
		$e_query = slugify(episode.title);
	}}
	class="group"
>
	<div class="relative aspect-1 overflow-hidden">
		<div
			bind:this={img_small}
			class="blur-load absolute left-0 top-0 h-full w-full bg-cover bg-center opacity-100"
			style={`background-image: url(${url_small})`}
		>
			<img
				bind:this={img}
				id="card-image"
				on:load={() => {
					img.classList.remove('opacity-0');
					img.classList.add('opacity-100');
				}}
				src={url}
				alt="Episode Card"
				class="absolute left-0 top-0 w-full object-contain opacity-0 transition duration-500 ease-in"
				loading="lazy"
			/>
		</div>

		<div
			class="relative h-full opacity-0 backdrop-blur-sm backdrop-filter duration-300 group-hover:opacity-100 group-hover:transition-opacity"
		>
			<img
				src="/img/episode_hovercard1000px.webp"
				alt="Hover Card"
				class=" h-full object-contain drop-shadow-xl"
				loading="lazy"
			/>
			<div class="card-text rounded-lg p-4">
				<div class="h-full w-full flex-wrap items-center justify-center">
					<p class="text-s line-clamp-1 font-sans uppercase">{episode.title}</p>
					<p class=" line-clamp-1 font-sans text-xs">{episode.author}</p>
				</div>
			</div>
		</div>
	</div>
</button>

<style>
	.card-text {
		position: absolute;
		bottom: 22%;
		left: 50%;
		z-index: -1;
		width: 90%;
		height: 23%;
		transform: translate(-50%, 50%);
		text-align: center;
		background: radial-gradient(
				182.95% 182.95% at 50% -82.95%,
				rgba(255, 255, 255, 0) 27.6%,
				rgba(255, 255, 255, 0.8) 100%
			),
			linear-gradient(180deg, rgba(255, 255, 255, 0.8) 0%, rgba(255, 255, 255, 0) 100%),
			radial-gradient(50% 50% at 50% 50%, #fff 0%, rgba(255, 255, 255, 0) 100%);
		box-shadow:
			-20px 20px 72px #b5b5b5,
			20px -20px 72px #ffffff;
	}

	.blur-load {
		background-size: cover;
		background-position: center;
	}
</style>
