<script lang="ts">
  import type { TodayData } from "$lib/server/types";
  import { humanizeTime, parseDateTime, periodDisplayName } from "$lib/utils";
  import ClassPeriod from "./ClassPeriod.svelte";
  import FreePeriod from "./FreePeriod.svelte";
  import NextUp from "./NextUp.svelte";

  export let today: TodayData;
</script>

<div
  class="flex flex-col gap-4 p-5 rounded-lg bg-stone-800 text-sm md:text-base"
>
  {#if today}
    <NextUp {today} />
    <div class="grid items-center today-grid-layout gap-x-2 gap-y-3">
      {#each today.periods.filter((period) => period.type !== "transition") as period}
        <span class="text-stone-500 justify-self-end"
          >{humanizeTime(parseDateTime(today.date, period.time))}</span
        >
        {#if period.type === "class"}
          <ClassPeriod {...period} />
        {:else if period.type === "free"}
          <FreePeriod {...period} />
        {:else}
          <p class="text-stone-400 pl-2">{periodDisplayName(period)}</p>
        {/if}
      {/each}
    </div>
  {:else}
    <p>No period data available.</p>
  {/if}
</div>

<style>
  .today-grid-layout {
    grid-template-columns: auto 1fr;
  }
</style>
