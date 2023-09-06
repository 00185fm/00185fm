<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import {
    Autocomplete,
    InputChip,
    type AutocompleteOption,
  } from "@skeletonlabs/skeleton";

  let playlistOptions: AutocompleteOption[] = [];
  export let allPlaylists: RecordModel[] = [];
  export let rawPlaylists: RecordModel[] = [];
  export let episodeId: string = "";
  export let episodePlaylists: string[] = [];
  if (rawPlaylists.length > 0) {
    rawPlaylists.forEach((current) => {
      episodePlaylists = [...episodePlaylists, current.title as string];
    });
  }

  if (allPlaylists.length > 0) {
    allPlaylists.forEach((playlist) => {
      playlistOptions.push({
        label: playlist.title,
        value: playlist.title,
      });
    });
  }

  let inputChip = "";

  function onInputChipSelect(event: CustomEvent<AutocompleteOption>): void {
    if (episodePlaylists.includes(event.detail.value as string) === false) {
      episodePlaylists = [...episodePlaylists, event.detail.value as string];
      inputChip = "";
    }
  }

  function isValidPlaylist(): boolean {
    return false;
  }
</script>

<form method="post" action="?/playlists">
  <input type="hidden" name="id" value={episodeId} />
  <div class="card mb-2 p-2 variant-ringed">
    <section class="p-4">
      <InputChip
        bind:input={inputChip}
        bind:value={episodePlaylists}
        name="chips"
        validation={isValidPlaylist}
      />
      <div class="card w-full max-h-48 p-4 overflow-y-auto" tabindex="-1">
        <Autocomplete
          emptyState="Playlist not found"
          bind:input={inputChip}
          options={playlistOptions}
          denylist={episodePlaylists}
          on:selection={onInputChipSelect}
        />
      </div>
    </section>
    <footer class="card-footer flex justify-end">
      <button type="submit" class="btn variant-filled">Update Playlists</button>
    </footer>
  </div>
</form>
