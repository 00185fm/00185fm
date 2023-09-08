<script lang="ts">
	export let data;
	$: playlists = data.playlists;
</script>

<div class="container mx-auto p-2 sm:p-10">
	<h2 class="h2 p-5">Playlists</h2>

	<div class="p-4 text-center">
		<p>
			Here you can easily find and delete episodes from a playlist. Go to episode's page for a
			detailed edit.
		</p>
	</div>
	{#if playlists?.length > 0}
		<div class="grid grid-flow-row sm:grid-flow-col gap-2">
			{#each playlists as playlist}
				<a href="/playlists/{playlist.title}" class="card card-hover p-5">
					<h3 class="h3">{playlist.title}</h3>
				</a>
			{/each}
		</div>
	{:else}
		<p>No playlist found</p>
	{/if}
</div>
