<script lang="ts">
  import BarcodeLink from "./BarcodeLink.svelte";
</script>

<div class="flex text-stone-500 overflow-x-auto">
  <div class="grow flex gap-3">
    <span class="font-bold">YASSPA</span>
    <a
      class="hover:text-stone-400"
      href="https://canvas.sbhs.net.au"
      target="_blank"
      rel="noreferrer noopener">Canvas</a
    >
    <a
      class="hover:text-stone-400"
      href="https://student.sbhs.net.au"
      target="_blank"
      rel="noreferrer noopener">Portal</a
    >
    <a
      class="hover:text-stone-400"
      href="https://portal.clipboard.app/sbhs/calendar"
      target="_blank"
      rel="noreferrer noopener">Clipboard</a
    >
    <a
      class="hover:text-stone-400"
      href="https://mail.google.com/a/student.sbhs.nsw.edu.au"
      target="_blank"
      rel="noreferrer noopener">Mail</a
    >
    <BarcodeLink />
    <span />
  </div>
  <form action="/auth?/logout" method="post">
    <button class="transition ease-out underline hover:text-stone-400"
      >Logout</button
    >
  </form>
</div>
