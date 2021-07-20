<script>
  import Snack from '../components/base/Snack.svelte'
  import Nav from '../components/Nav.svelte'
  import Signup from '../components/auth/Signup.svelte'
  import OauthLogin from '../components/auth/OauthLogin.svelte'
  import AuthLogo from './AuthLogo.svelte'
  import { LOGIN } from '../components/auth/store.js'
  import { PROJECT } from '../components/tp/store'
  import { onMount } from 'svelte'
  import { stores } from '@sapper/app'
  const { page } = stores()

  export let segment
  let render_main = false

  onMount(async () => {
    // initalize the auth store from the local storage
    const from_saved = await LOGIN.init_auth()
    if (!from_saved) await PROJECT.reset_proj()
    render_main = true
  })
</script>

{#if render_main}
  {#if $LOGIN.success && $LOGIN.jwt}
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
        <h4>[ERROR]: You are either logged out or the resource does not exist</h4>
        <a class="btn" href="/">Go to login page</a>
      </div>
    {/if}
  {/if}
{/if}

<!-- Alert elements are centrally managed (position: fixed) -->
<Snack />

<style>
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
    padding: 3em 1em 0;
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
  .error_msg a {
    display: block;
    text-align: center;
    width: 320px;
    margin: auto;
    margin-top: 20px;
    color: rgba(var(--lobster-rgb), 1);
    border-color: rgba(var(--lobster-rgb), 1);
  }
</style>
