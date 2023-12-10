<script lang="ts">
  import PeriodContainer from "./PeriodContainer.svelte";

  export let period: number;
</script>

<PeriodContainer {period} isCancelled>
  <span class="grow text-base md:text-lg">Free Period</span>
  <span class="text-base md:text-lg">-</span>
</PeriodContainer>
