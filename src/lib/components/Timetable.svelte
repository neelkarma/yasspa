<script lang="ts">
  import type { getTimetableData } from "$lib/server/sbhs";
  import Button from "./Button.svelte";
  import ErrorBox from "./ErrorBox.svelte";

  const getTimetablePromise = (): ReturnType<typeof getTimetableData> =>
    fetch("/api/timetable").then((res) => res.json());

  let timetablePromise = getTimetablePromise();

  export let dayName: string;

  let hoveredPeriod: string | null = null;
</script>

<div class="flex flex-col p-5 bg-stone-800 rounded-lg gap-4">
  {#await timetablePromise}
    <!-- Skeleton -->
    <div class="grid grid-cols-5 gap-1">
      {#each [...Array(5 * 5 * 3)] as _}
        <span class="rounded-md h-8 w-20 bg-stone-700 animate-pulse" />
      {/each}
    </div>
  {:then timetable}
    {#each timetable as week, i}
      <div class="grid timetable-grid gap-1 md:gap-x-3 text-sm md:text-base">
        {#each week as day}
          <div class="flex flex-col">
            <span
              class="self-center font-bold"
              class:text-sky-400={dayName === day.day}>{day.day}</span
            >
            {#each day.periods as period, j}
              <div
                class="transition ease-out duration-100 flex rounded-md p-1 gap-2"
                class:bg-stone-700={(period.type === "class" &&
                  hoveredPeriod === period?.subject) ||
                  (period.type === "free" && hoveredPeriod === "-")}
                on:focus={() => {
                  //@ts-expect-error svelte does not like this even though it is correct
                  hoveredPeriod = period?.subject ?? "-";
                }}
                on:mouseover={() => {
                  //@ts-expect-error see above
                  hoveredPeriod = period?.subject ?? "-";
                }}
                on:mouseleave={() => (hoveredPeriod = null)}
                tabindex={i * 5 + j}
                role="cell"
              >
                {#if period.type === "free"}
                  <span class="grow text-center text-stone-500">-</span>
                {:else if period.type === "class"}
                  <span class="grow">{period.subject}</span>
                  <span>{period.room ?? "-"}</span>
                {/if}
              </div>
            {/each}
          </div>
        {/each}
      </div>
      {#if i !== timetable.length - 1}
        <hr class="border-stone-700" />
      {/if}
    {/each}
  {:catch err}
    <ErrorBox>
      <p>Failed to load timetable. ({err})</p>
      <Button on:click={() => (timetablePromise = getTimetablePromise())}>
        Retry
      </Button>
    </ErrorBox>
  {/await}
</div>

<style>
  .timetable-grid {
    grid-template-columns: repeat(5, 1fr);
  }
</style>
