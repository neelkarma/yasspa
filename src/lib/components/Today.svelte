<script lang="ts">
  import { humanizeTime } from "$lib/utils";
  import type { PageServerData } from "../../routes/$types";
  import ClassPeriod from "./ClassPeriod.svelte";
  import FreePeriod from "./FreePeriod.svelte";

  export let today: NonNullable<PageServerData["today"]>["periods"];
</script>

<div class="flex flex-col p-5 rounded-lg bg-stone-800 text-sm md:text-base">
  <div class="grid items-center today-grid-layout gap-x-2 gap-y-3">
    {#each today.filter((period) => period.type !== "transition") as period}
      <span class="text-stone-500 justify-self-end"
        >{humanizeTime(period.time)}</span
      >
      {#if period.type === "rollcall"}
        <p class="text-stone-400 pl-2">Roll Call</p>
      {:else if period.type === "class"}
        <ClassPeriod {...period} />
      {:else if period.type === "free"}
        <FreePeriod {...period} />
      {:else if period.type === "break"}
        <p class="text-stone-400 pl-2">{period.break}</p>
      {:else if period.type === "dayend"}
        <p class="text-stone-400 pl-2">End of Day</p>
      {/if}
    {/each}
  </div>
</div>

<style>
  .today-grid-layout {
    grid-template-columns: auto 1fr;
  }
</style>
