<script lang="ts">
  import type { RecordModel } from "pocketbase";
  import {
    Autocomplete,
    InputChip,
    type AutocompleteOption,
  } from "@skeletonlabs/skeleton";

  let tagOptions: AutocompleteOption[] = [];
  export let allTags: RecordModel[] = [];
  export let rawTags: RecordModel[] = [];
  export let episodeId: string = "";
  let episodeTags: string[] = [];
  if (rawTags.length > 0) {
    rawTags.forEach((current) => {
      episodeTags = [...episodeTags, current.tag as string];
    });
  }
  if (allTags.length > 0) {
    allTags.forEach((tag) => {
      tagOptions.push({
        label: tag.tag,
        value: tag.tag,
      });
    });
  }

  let inputChip = "";

  function onInputChipSelect(event: CustomEvent<AutocompleteOption>): void {
    if (episodeTags.includes(event.detail.value as string) === false) {
      episodeTags = [...episodeTags, event.detail.value as string];
      inputChip = "";
    }
  }
</script>

<form method="post" action="?/tags">
  <input type="hidden" name="id" value={episodeId} />
  <div class="card mb-2 p-2 variant-ringed">
    <section class="p-4">
      <InputChip bind:input={inputChip} bind:value={episodeTags} name="chips" />
      <div class="card w-full max-h-48 p-4 overflow-y-auto" tabindex="-1">
        <Autocomplete
          emptyState="Write a tag and press Enter"
          bind:input={inputChip}
          options={tagOptions}
          denylist={episodeTags}
          on:selection={onInputChipSelect}
        />
      </div>
    </section>
    <footer class="card-footer flex justify-end">
      <button type="submit" class="btn variant-filled">Update Tags</button>
    </footer>
  </div>
</form>
