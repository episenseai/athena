<script>
  import GithubLogo from './GithubLogo.svelte'
  import GoogleLogo from './GoogleLogo.svelte'
  import { LOGIN } from './store.js'

  async function handle_login(provider) {
    disabled = true
    await LOGIN.oauth_login(provider)
    disabled = false
  }

  let disabled = false
</script>

<div class="auth-block">
  <button
    {disabled}
    on:click|preventDefault|stopPropagation={async () => await handle_login('github')}
    class="login"
    ><span><GithubLogo /></span>&nbsp;&nbsp;<span class="txt">Login with Github</span></button
  >
  <button
    {disabled}
    on:click|preventDefault|stopPropagation={async () => await handle_login('google')}
    class="login"
    ><span><GoogleLogo /></span>&nbsp;&nbsp;<span class="txt">Login with Google</span></button
  >
</div>

<style>
  .auth-block {
    padding: 10px;
    max-width: 700px;
    margin: auto;
    display: flex;
  }
  button {
    min-width: 280px;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  :global(.logo) :global(span) {
    color: var(--pink);
    font-size: 26px;
    padding-right: 5px;
  }
  .login {
    color: var(--text-dark);
    border-color: var(--pink);
  }
  button:hover.login {
    border-color: var(--lobster);
    background-color: #fafafa;
  }
  @media (max-width: 700px) {
    .auth-block {
      flex-direction: column;
    }
  }

</style>
