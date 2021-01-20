<script>
  import { LOGIN, SIGNUP } from './store.js'

  async function handle_login(event) {
    disabled = true
    // console.log(event)
    // console.log(event.target)
    // console.log(event.target.email.value)
    // console.log(event.target.password.value)

    // Call custom store method to handle auth
    LOGIN.login(event.target.email.value, event.target.password.value)
    disabled = false
  }
  let disabled = false
</script>

<div class="auth-block">
  <h3>Login</h3>
  <form on:submit|preventDefault|stopPropagation={handle_login}>
    <div class="input-block">
      <label for="email">Email:</label>
      <input required type="email" id="email" />
    </div>
    <div class="input-block">
      <label for="password">Password:</label>
      <input required type="password" id="password" />
    </div>
    <button type="submit" {disabled} class="login">Login to my account →</button>
  </form>
</div>

<style>
  .input-block {
    display: flex;
    max-width: 570px;
  }
  .input-block label {
    flex: 32%;
  }
  .input-block input {
    flex: 68%;
    align-self: center;
  }
  h3 {
    color: var(--pink);
    border-bottom: 1px solid var(--pink);
    font-size: 16px;
    margin: 0 auto 25px;
    padding: 0 5px 10px;
  }
  .auth-block {
    padding: 20px 18px 30px 24px;
    box-shadow: 0 10px 20px -4px rgba(50, 50, 93, 0.1), 0 30px 60px -30px rgba(0, 0, 0, 0.2),
      0 -18px 60px -10px rgba(0, 0, 0, 0.025);
    max-width: 600px;
    flex: 49%;
  }
  label {
    width: 200px;
    padding-right: 10px;
  }
  button {
    min-width: 220px;
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
  input {
    margin-bottom: 20px;
    margin-right: 15px;
    height: 32px;
    width: 200px;
    padding: 5px 10px 7px 10px;
    background-color: transparent;
    border: 1px solid #dfdfdf;
    outline: none;
    border-radius: 4px;
    color: #32325d;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
  }
  input:focus {
    border-color: #ffa27b;
  }
</style>
