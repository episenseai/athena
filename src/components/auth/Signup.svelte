<script>
  import { SIGNUP } from './store.js'
  import { snack } from '../base/store/snack'
  let form

  async function handle_signup(event) {
    disabled = true
    // console.log(event)
    // console.log(event.target)
    // console.log(event.target.email.value)
    // console.log(event.target.password.value)

    // Call custom store method to handle signup
    if (event.target.password.value !== event.target.password1.value) {
      await snack('error', 'Passwords in both should be the same. Try again.')
      disabled = false
      return
    }
    let val = await SIGNUP.signup(event.target.email.value, event.target.password.value)
    if (val) {
      form.reset()
    }

    disabled = false
  }
  // disable the submit button when request in flight
  let disabled = false
</script>

<div class="auth-block">
  <h3>Signup</h3>
  <form on:submit|preventDefault|stopPropagation={handle_signup} bind:this={form}>
    <div class="input-block">
      <label for="email">Email:</label>
      <input required type="email" id="email" />
    </div>
    <div class="input-block">
      <label for="password">Password:</label>
      <input required type="password" id="password" />
    </div>
    <div class="input-block">
      <label for="password1">Repeat Password:</label>
      <input required type="password" id="password1" />
    </div>
    <button type="submit" {disabled} class="signup">Sign up for a new acccount→</button>
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
    min-width: 180px;
  }
  :global(.logo) :global(span) {
    color: #444;
    font-size: 26px;
    padding-right: 5px;
  }
  .signup {
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
