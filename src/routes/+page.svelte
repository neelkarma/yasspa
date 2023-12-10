<script lang="ts">
  import AppShell from "$lib/components/AppShell.svelte";
  import LoginSplash from "$lib/components/LoginSplash.svelte";
  import type { PageServerData } from "./$types";

  export let data: PageServerData;
</script>

{#if data.authorized}
  <AppShell today={data.today} />
{:else}
  <LoginSplash />
{/if}
