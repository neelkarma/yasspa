<script lang="ts">
  export let period: number;
  export let isCancelled = false;
</script>

<div
  class="flex items-center gap-3 px-3 py-2 rounded-lg border-stone-600 border-[1px]"
  class:text-stone-500={isCancelled}
>
  <span class="text-lg md:text-xl">{period}</span>
  <slot />
</div>
