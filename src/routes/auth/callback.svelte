<script>
  import ProgressL from '../../components/base/ProgressL.svelte'
  import { snack } from '../../components/base/store/snack'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { stores } from '@sapper/app'
  import { LOGIN } from '../../components/auth/store'

  const { page } = stores()

  let done = false
  let success = false

  onMount(async () => {
    let login = get(LOGIN)
    console.log(login)
    if (login && login.success) {
      window.location.href = window.location.origin
    }
    let code = get(page).query.code
    let state = get(page).query.state
    let scope_query = get(page).query.scope

    success = await LOGIN.oauth_callback(code, state, scope_query)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    done = true
    console.log(success)
  })

</script>

<div class="callback">
  {#if !done}
    <h3>Authentication in progress ...</h3>
    <ProgressL />
  {:else if !success}
    <h3 class="failed">ERROR: Authentication failed...</h3>
  {:else}
    <pre>{JSON.stringify($LOGIN)}</pre>
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

</style>
