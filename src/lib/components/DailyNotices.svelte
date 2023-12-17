<script lang="ts">
  import type { DailyNoticesData } from "$lib/server/types";
  import { onMount } from "svelte";
  import Button from "./Button.svelte";
  import ErrorBox from "./ErrorBox.svelte";

  let noticesPromise: Promise<DailyNoticesData> | null = null;
  let observedEl: HTMLDivElement;

  const getNoticesPromise = () =>
    fetch("/api/notices").then((res) => res.json());

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          noticesPromise = getNoticesPromise();
          observer.unobserve(observedEl);
        }
      },
      {
        threshold: 0.05,
      }
    );
    observer.observe(observedEl);
  });

  let filter = "";
  let year = "all";
</script>

<div bind:this={observedEl} class="flex flex-col grow">
  <h1 class="text-3xl font-bold mb-2 my-10">Daily Notices</h1>

  <div class="flex gap-1">
    <label for="filter-input" class="hidden"> Filter </label>
    <input
      type="text"
      id="filter-input"
      placeholder="Filter..."
      class="grow transition ease-out p-2 rounded-md bg-stone-800 hover:bg-stone-700 focus-visible:bg-stone-700 focus-visible:outline-1 border-2 border-stone-700"
      bind:value={filter}
    />
    <label for="year-select" class="hidden"> Year </label>
    <select
      bind:value={year}
      id="year-select"
      class="transition ease-out p-2 rounded-md bg-stone-800 border-2 border-stone-700 hover:bg-stone-700 focus-visible:bg-stone-700"
    >
      <option value="all">All Years</option>
      <option>7</option>
      <option>8</option>
      <option>9</option>
      <option>10</option>
      <option>11</option>
      <option>12</option>
    </select>
  </div>

  {#if noticesPromise}
    <div class="flex flex-col gap-3">
      <span />
      {#await noticesPromise}
        {#each [...Array(5)] as _}
          <div class="h-28 rounded-lg bg-stone-700 animate-pulse" />
        {/each}
      {:then notices}
        {#if notices.length === 0}
          <p>No notices.</p>
        {:else}
          {@const filteredNotices = notices.filter((notice) => {
            if (year !== "all" && !notice.years.includes(year)) return false;
            if (filter === "") return true;
            return (
              notice.title.toLowerCase().includes(filter.toLowerCase()) ||
              notice.content.toLowerCase().includes(filter.toLowerCase())
            );
          })}
          {#each filteredNotices as notice, i}
            <div class="flex flex-col gap-1">
              <details>
                <summary class="text-lg md:text-xl">
                  {notice.title}
                  <span class="text-stone-400">({notice.displayYears})</span>
                </summary>
                <span>{@html notice.content}</span>
                <p class="text-stone-400">
                  {notice.author}
                </p>
              </details>
            </div>
            {#if i !== filteredNotices.length - 1}
              <hr class="border-stone-600" />
            {/if}
          {/each}
        {/if}
      {:catch err}
        <ErrorBox>
          <span>Failed to load daily notices. ({err})</span>
          <Button on:click={() => (noticesPromise = getNoticesPromise())}>
            Retry
          </Button>
        </ErrorBox>
      {/await}
    </div>
  {/if}
</div>
