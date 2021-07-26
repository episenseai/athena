<script>
  import { dev } from '$app/env'
  import { PROJECT } from './store'
</script>

<div class="container">
  <h2 class="error">
    An Error occurred while processing data for the
    <span>({$PROJECT.current_stage.split(':')[0]})</span>
    stage.
  </h2>
  {#if dev}
    <pre>{JSON.stringify($PROJECT)}</pre>
    <pre>ErrorType: {$PROJECT.error_type}</pre>
    <pre>ErrorStack: {$PROJECT.error_stack}</pre>
  {/if}
  <div class="actions">
    <h3>
      You can start a <span>new pipeline</span> or <span>reset</span> the error and rerun the stage;
      possibly with the changed settings.
    </h3>
    <button on:click={async () => await PROJECT.unfreeze()}>Reset the pipeline error &rarr;</button>
  </div>
</div>

<style>
  .container {
    width: 800px;
    margin: 0px auto 10px;
    text-align: center;
  }
  .container h2 span {
    color: var(--lobster);
    padding: 0 5px;
  }
  .container h3 {
    margin-bottom: 20px;
  }
  h2.error {
    color: red;
    border-bottom: var(--medium-border);
  }
  button {
    margin-top: 0;
    margin-bottom: 0px;
  }
  pre {
    text-align: left;
    margin: 20px auto;
    font-size: 13px;
    overflow: scroll;
    padding: 15px 5px;
  }

  h3 span {
    color: var(--pink);
  }
  .actions {
    border: var(--light-border);
    padding: 20px 20px;
    border-radius: 5px;
    margin-top: 20px;
  }
</style>
