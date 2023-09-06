<script lang="ts">
  import EpisodeCard from "$lib/components/cards/episodeCard.svelte";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import {
    checkEmpty,
    playlistsToString,
    tagsToString,
  } from "$lib/client/utility";
  export let data;
  const { episodes } = data;
  let showIncomplete = false;
  const cardDimension = 1;

  import { createSearchStore, searchHandler } from "$lib/stores/search";
  import { onDestroy } from "svelte";

  const searchEpisodes = episodes?.map((episode) => ({
    ...episode,
    searchTerms: `${episode.title} ${episode.author} ${tagsToString(
      episode
    )} ${playlistsToString(episode)} ${episode.description} ${episode.slug}`,
  }));

  const searchStore = createSearchStore(searchEpisodes);

  const unsubscribe = searchStore.subscribe((model) => searchHandler(model));

  onDestroy(() => {
    unsubscribe();
  });
</script>

<div class="container mx-auto p-10">
  {#if episodes.length > 0}
    <div class="flex justify-between">
      <h2 class="h2 p-5">Episodes</h2>
      <input
        class="input mx-10 my-5"
        type="search"
        placeholder="Search..."
        bind:value={$searchStore.search}
      />

      <SlideToggle
        class="p-8"
        size="sm"
        name="incomplete"
        bind:checked={showIncomplete}>Incomplete</SlideToggle
      >
    </div>
    <div class="grid grid-cols-5 gap-2">
      {#each $searchStore.filtered as episode}
        {#if showIncomplete}
          {#if checkEmpty(episode).length > 0}
            <EpisodeCard {episode} {cardDimension} />
          {/if}
        {:else}
          <EpisodeCard {episode} {cardDimension} />
        {/if}
      {/each}
    </div>
  {:else}
    <h2 class="h2 p-5">Episodes</h2>
    <p>No episode found</p>
  {/if}
</div>
