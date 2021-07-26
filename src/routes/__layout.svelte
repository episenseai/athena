<script>
  import '../app.css'
  import Snack from '$lib/base/Snack.svelte'
  import ProgressL from '$lib/base/ProgressL.svelte'
  import Nav from '$lib/Nav.svelte'
  import OauthLogin from '$lib/auth/OauthLogin.svelte'
  import AuthLogo from './AuthLogo.svelte'
  import { LOGIN } from '$lib/auth/store.js'
  import { PROJECT } from '$lib/tabular/store'
  import { onMount } from 'svelte'
  import { page } from '$app/stores'

  export let segment
  let render_main = false

  let show_porgress = false

  onMount(async () => {
    // initalize the auth store from the local storage
    const from_saved = await LOGIN.init_auth()
    if (!from_saved) await PROJECT.reset_proj()
    render_main = true
  })
</script>

<svelte:window
  on:pgbaron={() => {
    show_porgress = true
  }}
  on:pgbaroff={() => {
    show_porgress = false
  }}
/>

{#if render_main}
  {#if $LOGIN.success && $LOGIN.access_token}
    {#if show_porgress}
      <div class="progress">
        <ProgressL />
      </div>
    {/if}
    {#if segment !== 'tabular'}
      <Nav {segment} level="home" />
      <main class="outer-layout">
        <slot />
      </main>
    {:else}
      <main>
        <slot />
      </main>
    {/if}
  {:else}
    <a href="/"><AuthLogo /></a>
    {#if $page.path === '/'}
      <div class="auth">
        <OauthLogin />
      </div>
    {:else if $page.path === '/auth/callback'}
      <main>
        <slot />
      </main>
    {:else}
      <div class="error_msg">
        <h4>Login / Relogin to continue...</h4>
        <div class="auth">
          <OauthLogin />
        </div>
      </div>
    {/if}
  {/if}
{/if}

<!-- Alert elements are centrally managed (position: fixed) -->
<Snack />

<style>
  .progress {
    position: fixed;
    z-index: 3000;
    top: 0;
    left: 0px;
    width: 100%;
  }
  .auth {
    display: flex;
    justify-content: space-evenly;
  }
  main {
    min-height: 100vh;
    position: relative;
    background-color: white;
    margin: 0 auto;
    box-sizing: border-box;
    position: relative;
  }
  main.outer-layout {
    padding: 3em 0.5em 0;
  }
  :global(.side-pages) {
    width: 660px;
    margin: 0 auto;
  }

  :global(.logo-global) {
    color: rgba(var(--pink-rgb), 1);
    font-size: 15px;
  }
  .error_msg h4 {
    letter-spacing: 0.02em;
    text-align: center;
    font-size: 20px;
    margin-top: 50px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
  }
</style>
