<script lang="ts">
  import { enhance } from "$app/forms";
  import { PUBLIC_RADIO_URL } from "$env/static/public";
  import type { nptype } from "$lib/utility/types";
  import type { ActionData } from "../../routes/$types";

  export let np: nptype;
  export let form: ActionData;

  import { getToastStore, type ToastSettings } from "@skeletonlabs/skeleton";
  const toastStore = getToastStore();

  const tSkip: ToastSettings = {
    message: "Track successfully skipped! 🎉",
    background: "variant-ghost-primary",
    timeout: 2000,
    hoverable: true,
  };
  $: {
    if (form?.success === true) {
      toastStore.trigger(tSkip);
    }
  }
</script>

<div class="card variant-glass-primary">
  <header class="card-header flex justify-between">
    <p class="h2">Now Playing</p>
    <form method="POST" use:enhance>
      <button class="btn variant-filled" type="submit" formaction="?/nextsong"
        >Skip Current</button
      >
    </form>
  </header>
  <section class="p-4">
    <p>Title: {np.title}</p>
    <p>Artist: {np.artist}</p>
    {#if np.is_live}
      <p class="text-xl btn variant-filled-error">LIVE!!</p>
    {:else}
      <a href={"/shows/" + np.slug} class="btn variant-ghost-primary capitalize"
        >Go to episode!</a
      >
    {/if}
  </section>
  <footer class="card-footer space-y-4">
    <audio controls src={PUBLIC_RADIO_URL} class="w-full" />
  </footer>
</div>
