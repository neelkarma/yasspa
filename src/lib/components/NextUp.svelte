<script lang="ts">
  import { dateFnsLocale, parseDateTime, periodDisplayName } from "$lib/utils";
  import { formatDuration, intervalToDuration } from "date-fns";
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
      const duration = intervalToDuration({
        start: now,
        end: periodTime,
      });
      const durationText = formatDuration(duration, {
        locale: dateFnsLocale,
      });
      return [nextPeriodIndex, durationText];
    }
    return null;
  };

  $: nextPeriodData = getNextPeriod(now) ?? [null, null];
  $: nextPeriodIndex = nextPeriodData[0];
  $: nextPeriod =
    nextPeriodIndex !== null ? today.periods[nextPeriodIndex as number] : null;
  $: durationText = nextPeriodData[1];
</script>

<svelte:head>
  <title>
    {nextPeriod
      ? `${periodDisplayName(nextPeriod, true)} in ${durationText} | YASSPA`
      : "YASSPA"}
  </title>
</svelte:head>

<div class="flex flex-col text-center text-xl md:text-2xl">
  {#if nextPeriod}
    <span class="font-bold">{periodDisplayName(nextPeriod)}</span>
    <span>
      <span class="text-stone-400">in</span>
      {durationText}.
    </span>
  {:else}
    Have a great day!
  {/if}
</div>
