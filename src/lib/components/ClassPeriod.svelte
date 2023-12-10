<script lang="ts">
  import PeriodContainer from "./PeriodContainer.svelte";

  export let period: number;
  export let subject: string;
  export let teacher: string;
  export let room: string;
  export let isCancelled = false;
  export let isSubstitute = false;
  export let isRoomChange = false;
</script>

<PeriodContainer {period} {isCancelled}>
  <div class="grow flex flex-col">
    <span class="text-base md:text-lg" class:line-through={isCancelled}
      >{subject}</span
    >
    <span
      class:line-through={isCancelled}
      class:text-stone-300={!isCancelled}
      class:text-sky-400={isSubstitute}>{teacher}</span
    >
  </div>
  <span
    class="text-base md:text-lg"
    class:line-through={isCancelled}
    class:text-sky-400={isRoomChange}>{room ?? "-"}</span
  >
</PeriodContainer>
