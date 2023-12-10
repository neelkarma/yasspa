<script>
  import Button from "./Button.svelte";
</script>

<form
  action="/auth?/login"
  method="post"
  class="min-h-screen grid place-items-center"
>
  <div class="flex flex-col text-center gap-2">
    <h1 class="text-3xl font-bold">YASSPA</h1>
    <h3>Yet another SBHS Student Portal Alternative.</h3>
    <Button>Login</Button>
  </div>
</form>
