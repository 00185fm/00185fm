<script lang="ts">
  import { pb } from "$lib/pocketbase";
  import { checkEmpty } from "$lib/client/utility";
  import { PUBLIC_DEFAUL_ART } from "$env/static/public";
  import type { RecordModel } from "pocketbase";
  export let episode: RecordModel;
  export let cardDimension: number = 0;
  $: incomplete = checkEmpty(episode);

  $: url = PUBLIC_DEFAUL_ART;
  $: {
    if (episode.image !== "") {
      url = pb.files.getUrl(episode, episode.image, { thumb: "300x300" });
    } else {
      url = PUBLIC_DEFAUL_ART;
    }
  }
</script>

<a href={"/shows/" + episode.slug} class="card card-hover">
  {#if cardDimension === 1}
    <header class="card-header">
      <img loading="lazy" src={url} class="bg-black/50 w-full" alt="" />
    </header>
  {/if}
  <section class="p-4">
    <h3 class="h3">{episode.title} w/ {episode.author}</h3>
  </section>
  <footer class="card-footer">
    {#if incomplete.length > 0}
      <p class="capitalize">⛔️ {incomplete} is missing</p>
    {:else}
      <p>✅ Complete</p>
    {/if}
  </footer>
</a>
