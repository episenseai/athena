<script>
  import { PROJECT } from './store'
  import ProgressL from '../base/ProgressL.svelte'
  import Unfreeze from './Unfreeze.svelte'
  import { onMount } from 'svelte'

  onMount(async () => {
    await PROJECT.sse_update()
    return async () => PROJECT.sse_close()
  })
</script>

<div class="container">
  {#if $PROJECT.pipe_status === '0'}
    <h3>
      <span class="emoji">🚚</span>
      Building
      <span>{$PROJECT.current_stage.split(':')[0].toUpperCase()}</span>
      stage of the
      <span>({$PROJECT.name})</span>
      pipeline
    </h3>
    <ProgressL />
    <p>(If it is taking longer than usual try reloading the page)</p>

    <h4 class="note">
      While the pipeline stage is building you can switch to another project or start a new one.
    </h4>
  {:else if $PROJECT.pipe_status === '-1'}
    <Unfreeze />
  {/if}
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
    margin-bottom: 5px;
  }
  p {
    color: var(--lobster);
    margin: 10px 0;
  }
  h4.note {
    margin-top: 60px;
    color: var(--text-lighter);
    font-size: 15px;
    text-align: center;
    max-width: 600px;
    display: inline-block;
    border: var(--light-border);
    border-radius: 5px;
    padding: 10px 20px;
  }
  .emoji {
    font-size: 30px;
    top: 4px;
    position: relative;
  }
</style>
