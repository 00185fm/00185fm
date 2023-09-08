<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { env } from '$env/dynamic/public';
	import { ProgressRadial, FileDropzone } from '@skeletonlabs/skeleton';
	import type { RecordModel } from 'pocketbase';

	export let token: string;
	export let item: RecordModel;
	export let form = true;
	export let uploading: boolean = false;

	export let uploadItems = ['image', 'audio'];

	let imageFile: FileList;
	let audioFile: FileList;
	let imageUrl: string | ArrayBuffer | null = '';

	$: percent = 0;
	const uploadFile = async () => {
		try {
			let formData = new FormData();

			if (uploadItems.find((i) => i === 'image')) {
				if (imageFile !== undefined) {
					formData.append('image', imageFile[0]);
				}
			}
			if (uploadItems.find((i) => i === 'audio')) {
				if (audioFile !== undefined) {
					formData.append('audio', audioFile[0]);
				}
			}
			let xhr = new XMLHttpRequest();

			// listen for upload progress
			xhr.upload.onprogress = function (event) {
				uploading = true;
				percent = Math.round((100 * event.loaded) / event.total);
			};

			// handle error
			xhr.upload.onerror = function () {
				uploading = false;
				console.log(`Error during the upload: ${xhr.status}.`);
			};

			xhr.onload = async function (event) {
				uploading = false;
				form = false;
				goto($page.url);
			};

			xhr.open('PATCH', env.PUBLIC_POCKETBASE_URL + '/api/collections/episodes/records/' + item.id);
			xhr.setRequestHeader('Authorization', token);
			xhr.send(formData);
		} catch (error) {
			console.log(error);
		}
	};

	export let lock_upload = true;

	let disabled = true;
	$: {
		if (imageFile !== undefined || audioFile !== undefined) {
			if (lock_upload === false) {
				disabled = false;
			} else {
				disabled = true;
			}
		} else {
			disabled = true;
		}
	}
	$: {
		if (imageFile !== undefined) {
			const reader = new FileReader();
			reader.readAsDataURL(imageFile[0]);
			reader.addEventListener(
				'load',
				() => {
					// convert image file to base64 string
					imageUrl = reader.result;
				},
				false
			);
		}
	}
</script>

{#if uploading}
	<div class="grid grid-flow-row">
		<div class="flex justify-center">
			<ProgressRadial value={percent}>{percent}%</ProgressRadial>
		</div>
		<div class="p-2">
			<p class="text-center">Wait until the end of fade effect and then refresh the page.</p>
		</div>
	</div>
{:else}
	<div class="grid grid-flow-col gap-3">
		{#if uploadItems.find((i) => i === 'image')}
			<div>
				<h3>Image</h3>
				{#if imageFile !== undefined}
					<div class="card">
						<header class="card-header text-xl font-bold text-center">
							{imageFile[0].name}
						</header>
						<section class="p-4 flex justify-center">
							<img src={imageUrl} alt="episode art" class="w-1/3" />
						</section>
						<footer class="card-footer">
							<div class="flex justify-end">
								<button
									class="btn variant-filled"
									on:click={() => {
										(imageFile = undefined), (imageUrl = '');
									}}>Cancel</button
								>
							</div>
						</footer>
					</div>
				{:else}
					<FileDropzone name="image" accept="image/*" bind:files={imageFile}>
						<svelte:fragment slot="lead"
							><i class="fa-solid fa-file-arrow-up text-4xl" /></svelte:fragment
						>
						<svelte:fragment slot="meta">PNG, JPG, and GIF allowed.</svelte:fragment>
					</FileDropzone>
				{/if}
			</div>
		{/if}
		{#if uploadItems.find((i) => i === 'audio')}
			<div>
				<h3>Audio</h3>
				{#if audioFile !== undefined}
					<div class="card">
						<header class="card-header text-xl font-bold text-center">
							{audioFile[0].name}
						</header>
						<footer class="card-footer">
							<div class="flex justify-end">
								<button
									class="btn variant-filled"
									on:click={() => {
										audioFile = undefined;
									}}>Cancel</button
								>
							</div>
						</footer>
					</div>
				{:else}
					<FileDropzone name="audio" accept="audio/*" bind:files={audioFile}>
						<svelte:fragment slot="lead"
							><i class="fa-solid fa-file-arrow-up text-4xl" /></svelte:fragment
						>
						<svelte:fragment slot="meta">WAV, MP3, and AIFF allowed.</svelte:fragment>
					</FileDropzone>
				{/if}
			</div>
		{/if}
	</div>
{/if}
<div class="flex justify-end mt-4">
	<button class="btn variant-filled" on:click={uploadFile} {disabled}>Upload</button>
</div>
