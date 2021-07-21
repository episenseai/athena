<script>
  import Nav from '$lib/Nav.svelte'
  import Snack from '$lib/base/Snack.svelte'
  import { onMount } from 'svelte'
  import { PROJECT } from '$lib/tabular/store'
  export let segment

  onMount(async () => {
    // initalize the auth store from the local storage
    await PROJECT.init_proj()
  })
</script>

<Nav {segment} level="tabular" />
<main>
  <slot />
</main>

<!-- Alert elements are centrally managed (position: fixed) -->
<Snack />

<style>
  main {
    min-height: calc(100% - 40px);
    position: relative;
    background-color: white;
    padding: 0.5em 1em 0;
    margin: 0 auto;
    box-sizing: border-box;
    padding-top: 50px;
  }
</style>
