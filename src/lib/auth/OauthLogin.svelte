<script>
  import { LOGIN } from './store.js'

  async function handle_login(provider) {
    disabled = true
    LOGIN.oauth_login(provider)
    disabled = false
  }

  let disabled = false
</script>

<div class="auth-block">
  <button
    {disabled}
    on:click|preventDefault|stopPropagation={() => handle_login('github')}
    class="login">Login with Github</button
  >
  <button
    {disabled}
    on:click|preventDefault|stopPropagation={() => handle_login('google')}
    class="login">Login with Google</button
  >
</div>

<style>
  .auth-block {
    padding: 10px;
    max-width: 700px;
    margin: auto;
  }
  button {
    min-width: 280px;
    margin: 10px;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  :global(.logo) :global(span) {
    color: var(--pink);
    font-size: 26px;
    padding-right: 5px;
  }
  .login {
    color: var(--lobster);
    border-color: var(--lobster);
  }
</style>
