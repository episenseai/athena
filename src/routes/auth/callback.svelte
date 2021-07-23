<script>
  import ProgressL from '$lib/base/ProgressL.svelte'
  import Spinner from '$lib/Spinner.svelte'
  import { onMount } from 'svelte'
  import { LOGIN } from '$lib/auth/store'
  import { PROJECT } from '$lib/tabular/store'
  import { page } from '$app/stores'

  let done = false
  let success = false

  let interval
  let seconds = 5
  const handleTick = () => (seconds -= 1)

  const redirect = () => {
    if (interval) clearInterval(interval)
    window.location.href = window.location.origin
  }
  onMount(async () => {
    if ($LOGIN && $LOGIN.success) redirect()

    let code = $page.query.get('code')
    let state = $page.query.get('state')
    let scope_query = $page.query.get('scope')

    success = await LOGIN.oauth_callback(code, state, scope_query)
    // await new Promise(resolve => setTimeout(resolve, 30000))
    await LOGIN.reset_ustate()

    if (!success) {
      if (interval) clearInterval(interval)
      seconds = 5
      interval = setInterval(handleTick, 1000)
    }

    done = true
  })

  $: if (seconds <= 0) redirect()
</script>

<svelte:window
  on:loginok={async (e) => {
    if (e.detail.new_user) {
      await PROJECT.reset_proj()
    }
    window.location.href = e.detail.redirect
  }}
/>

<div class="callback">
  {#if !done}
    <h3>Authentication in progress ...</h3>
    <ProgressL />
  {:else if !success}
    <h3 class="failed">
      ERROR: Authentication failed. Will redirect to home page in <span class="seconds"
        >{seconds >= 0 ? seconds : 0}</span
      >
      seconds
      <span class="spinner"><Spinner color={'rgba(0,0,0,0.8)'} /></span>
    </h3>
    <button on:click|preventDefault|stopPropagation={() => redirect()}>Go to login page</button>
  {/if}
</div>

<style>
  .callback {
    width: 98%;
    max-width: 800px;
    margin: 50px auto 10px;
  }
  h3 {
    text-align: center;
  }
  h3.failed {
    color: rgb(var(--red-rgb));
  }

  button {
    display: block;
    text-align: center;
    width: 320px;
    margin: auto;
    margin-top: 30px;
    padding-top: 10px;
    padding-bottom: 10px;
    color: rgba(var(--lobster-rgb), 1);
    border-color: rgba(var(--lobster-rgb), 1);
  }
  span.seconds {
    color: rgba(0, 0, 0, 0.8);
  }
  span.spinner {
    position: relative;
    top: 8px;
    padding-left: 5px;
  }
</style>
