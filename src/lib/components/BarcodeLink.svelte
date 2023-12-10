<script lang="ts">
  let status: "idle" | "working" | "error" = "idle";
  $: interactive = status !== "working";

  const generateBarcode = async () => {
    try {
      status = "working";
      const id = await fetch("/api/id")
        .then((res) => res.json())
        .then((data) => data.id);
      const { default: JsBarcode } = await import("jsbarcode");
      const canvas = document.createElement("canvas");
      JsBarcode(canvas, id);
      const a = document.createElement("a");
      a.href = canvas.toDataURL();
      a.target = "_blank";
      a.click();
      a.remove();
      canvas.remove();
      status = "idle";
    } catch (err) {
      console.error(err);
      status = "error";
      setTimeout(() => {
        if (status === "error") status = "idle";
      }, 2000);
    }
  };
</script>

<button
  class="transition"
  class:underline={interactive}
  class:hover:text-stone-400={interactive}
  on:click={generateBarcode}
  disabled={!interactive}
>
  {#if status === "idle"}
    Barcode
  {:else if status === "working"}
    Generating...
  {:else if status === "error"}
    Error
  {/if}
</button>
