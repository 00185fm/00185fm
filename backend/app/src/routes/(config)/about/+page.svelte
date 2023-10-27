<script lang="ts">
	import { enhance } from '$app/forms';
	import { slugify } from '$lib/client/utility';

	export let data;
	$: projects = data.projects || [];
	$: radio = data.radio;
	let aboutEdit: boolean = false;
	let impressumEdit: boolean = false;
</script>

<div class="container mx-auto p-2 lg:p-10">
	<h2 class="text-center lg:text-left h2 p-5">About</h2>

	<section class="py-4">
		<p class="text-xl font-bold">Projects</p>
		{#if projects?.length > 0}
			<div class="grid grid-cols-1 lg:grid-cols-4 gap-2">
				{#each projects as project}
					<a class="card p-4 card-hover" href="/about/{slugify(project.name)}">
						<span class="text-xl font-bold">
							{project.name}
						</span>
					</a>
				{/each}
			</div>
		{:else}
			<p>No project found</p>
		{/if}
	</section>
	<section class="py-4 grid lg:grid-cols-2 gap-4">
		<div class="py-2">
			<span class="text-lg font-bold"
				>About <button
					on:click={() => {
						aboutEdit = !aboutEdit;
					}}
					class="btn-icon btn-icon-sm variant-ghost">⚙️</button
				></span
			>
			<div class="whitespace-pre-wrap">
				{@html radio?.about}
			</div>
			{#if aboutEdit}
				<form
					method="post"
					action="?/about"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								aboutEdit = false;
								update();
							}
						};
					}}
				>
					<textarea
						name="about"
						id="about"
						cols="30"
						rows="5"
						class="w-full textarea"
						placeholder="About"
						value={radio?.about}
					></textarea>
					<input type="text" class="hidden" name="id" value={radio?.id} />
					<button class="btn variant-filled">Save</button>
				</form>
			{/if}
		</div>
		<div class="py-2">
			<span class="text-lg font-bold"
				>Impressum <button
					on:click={() => {
						impressumEdit = !impressumEdit;
					}}
					class="btn-icon btn-icon-sm variant-ghost">⚙️</button
				></span
			>
			{@html radio?.impressum}
			{#if impressumEdit}
				<form
					method="post"
					action="?/impressum"
					use:enhance={() => {
						return async ({ result, update }) => {
							if (result.type === 'success') {
								impressumEdit = false;
								update();
							}
						};
					}}
				>
					<textarea
						name="impressum"
						id="impressum"
						cols="30"
						rows="3"
						class="w-full textarea"
						placeholder="Impressum"
						value={radio?.impressum}
					></textarea>
					<input type="text" class="hidden" name="id" value={radio?.id} />
					<button class="btn variant-filled">Save</button>
				</form>
			{/if}
		</div>
	</section>
</div>
