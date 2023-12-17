<script lang="ts">
  import type { TodayData } from "$lib/server/types";
  import Button from "./Button.svelte";
  import Credits from "./Credits.svelte";
  import DailyNotices from "./DailyNotices.svelte";
  import NavBar from "./NavBar.svelte";
  import Timetable from "./Timetable.svelte";
  import Today from "./Today.svelte";

  export let today: TodayData;

  let viewingTimetable = false;
</script>

<div class="flex flex-col min-h-screen bg-stone-900 p-2">
  <NavBar />
  <div class="grow grid place-items-center p-2 overflow-x-auto">
    <div class="flex flex-col gap-1">
      {#if !viewingTimetable}
        <Today {today} />
        <Button on:click={() => (viewingTimetable = true)}>
          View Timetable
        </Button>
      {:else}
        <Timetable dayName={today?.day} />
        <Button on:click={() => (viewingTimetable = false)}>View Today</Button>
      {/if}
    </div>
  </div>
</div>
<div class="flex flex-col min-h-screen md:w-3/4 xl:w-1/2 px-2 mx-auto gap-2">
  <DailyNotices />
  <Credits />
</div>
