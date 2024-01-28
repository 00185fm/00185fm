<script lang="ts">
	import { browser } from '$app/environment';

	const PUBLIC_DEFAUL_ART = '/img/placeholder/00185fm_default_image.png';
	const PUBLIC_DEFAUL_ART_20 = '/img/placeholder/00185fm_default_image_20px.png';
	import { selected_episode } from '$lib/utility/stores';
	import { file_url } from '$lib/utility/utility';

	let img: HTMLImageElement;
	let img_small: HTMLDivElement;

	$: url = PUBLIC_DEFAUL_ART;
	$: url_small = PUBLIC_DEFAUL_ART_20;
	$: {
		if (browser) {
			if ($selected_episode?.image !== '') {
				url = file_url(
					String($selected_episode?.id),
					$selected_episode?.image,
					'?thumb=1000x1000',
					$selected_episode?.collectionName
				);
				url_small = file_url(
					String($selected_episode?.id),
					$selected_episode?.image,
					'?thumb=20x20',
					$selected_episode?.collectionName
				);
			} else {
				url = PUBLIC_DEFAUL_ART;
				url_small = PUBLIC_DEFAUL_ART_20;
			}
		}
	}
</script>

<div class="relative aspect-1 max-h-fit">
	<div
		bind:this={img_small}
		class="blur-load absolute left-0 top-0 h-full w-full rounded-3xl bg-center opacity-100"
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
			class="absolute left-0 top-0 w-full rounded-3xl object-contain opacity-0 transition-opacity duration-200 ease-in-out"
			loading="lazy"
		/>
	</div>
</div>

<style>
	.blur-load {
		background-size: cover;
		background-position: center;
		background-repeat: no-repeat;
	}
</style>
