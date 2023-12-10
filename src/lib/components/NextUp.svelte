<script lang="ts">
  import { parseDateTime } from "$lib/utils";
  import { formatDistance } from "date-fns";
  import { onMount } from "svelte";
  import type { PageServerData } from "../../routes/$types";

  export let today: NonNullable<PageServerData["today"]>;

  let now = Date.now();
  onMount(() => {
    const interval = setInterval(() => (now = Date.now()), 1000);
    return () => clearInterval(interval);
  });

  const getNextPeriod = (now: number) => {
    const nextPeriodIndex = today.periods.findIndex(
      (period) => parseDateTime(today.date, period.time).getTime() > now
    );
    if (nextPeriodIndex !== -1) {
      const periodTime = parseDateTime(
        today.date,
        today.periods[nextPeriodIndex].time
      );
      const timeUntilPeriod = formatDistance(periodTime, now, {
        includeSeconds: true,
      });
      return [nextPeriodIndex, timeUntilPeriod];
    }
    return null;
  };

  const periodDisplayName = (period: any, useShortSubject = false) => {
    switch (period.type) {
      case "transition":
        return "Transition";
      case "rollcall":
        return "Roll Call";
      case "free":
        return "Free Period";
      case "dayend":
        return "End of Day";
      case "break":
        return period.break;
      case "class":
        return useShortSubject ? period.subjectShort : period.subject;
    }
  };

  $: nextPeriodData = getNextPeriod(now) ?? [null, null];
  $: nextPeriodIndex = nextPeriodData[0];
  $: nextPeriod =
    nextPeriodIndex !== null ? today.periods[nextPeriodIndex as number] : null;
  $: timeUntilPeriod = nextPeriodData[1];
</script>

<svelte:head>
  <title>
    {nextPeriod
      ? `${periodDisplayName(nextPeriod, true)} in ${timeUntilPeriod} | YASSPA`
      : "YASSPA"}
  </title>
</svelte:head>

<div class="text-center text-lg md:text-xl">
  {#if nextPeriod}
    <span class="font-bold">{periodDisplayName(nextPeriod)}</span>
    <span class="text-stone-400">in</span>
    {timeUntilPeriod}.
  {:else}
    Have a great day!
  {/if}
</div>
