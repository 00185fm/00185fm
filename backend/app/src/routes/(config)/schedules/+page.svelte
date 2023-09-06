<script lang="ts">
    export let data
    $: schedules = data.schedules
</script>

<div class="container mx-auto p-10">
	<h2 class="h2 p-5">Schedules</h2>

    {#if schedules?.length > 0}
        <div class="grid grid-flow-row gap-2">
            {#each schedules as schedule}
                <p>{schedule.info}</p>
                <p>{schedule.title}</p>
                <p>{schedule.author}</p>
                <p>{schedule.date}</p>
            {/each}
        </div>
    {:else}
        <p>No schedule found</p>
    {/if}
</div>