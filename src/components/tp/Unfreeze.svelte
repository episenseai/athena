<script>
  import { PROJECT } from './store'
</script>

<div class="container">
  <h3 class="error">
    Oops! An Error occurred while processing data for the
    <span>{$PROJECT.current_stage.split(':')[0].toUpperCase()}</span>
    stage.
  </h3>
  <pre>ErrorType: {$PROJECT.error_type}</pre>
  <pre>ErrorStack: {$PROJECT.error_stack}</pre>
  <p>
    If you want to try again or go back to the previous stage, please unfreeze the pipe by clicking the button
    below.
  </p>
  <button on:click={async () => await PROJECT.unfreeze()}>Unfreeze the PipeLine →</button>
  <p>Or you can start afresh by switching to a new project.</p>
</div>

<style>
  .container {
    width: 700px;
    margin: 80px auto 10px;
    text-align: center;
  }
  .container h3 span {
    color: var(--pink);
    padding: 0 5px;
  }
  .container h3 {
    margin-bottom: 20px;
  }
  h3.error {
    color: var(--reddish);
  }
  button {
    margin-top: 5px;
    margin-bottom: 30px;
  }
  pre {
    text-align: left;
    margin-bottom: 20px;
    font-size: 12px;
  }
</style>
