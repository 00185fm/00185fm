<script lang="ts">
  import type { ShowsRecord } from "$lib/pocketbase/types";

  export let show: ShowsRecord;
</script>

<a href="/shows/{show.slug}" class="card card-hover p-4">
  <h3 class="h3">{show.title} w/ {show.author}</h3>
</a>
