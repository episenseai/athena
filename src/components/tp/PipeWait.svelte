<script>
  import { snack } from '../base/store/snack'
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
  {#if $PROJECT.pipe_status == '0'}
    <h3>
      <span class="emoji">🚚</span>
      ... Currently processing data for the
      <span>{$PROJECT.current_stage.split(':')[0].toUpperCase()}</span>
      stage of the
      <span>{$PROJECT.name}</span>
      project.
    </h3>
    <ProgressL />
    <p>The page will automatically refresh when the job gets completed.</p>

    <h4 class="side-note">
      While the job is in progress you can switch to another project or start a new one.
      <br />
      <span>🍺</span>
      or
      <span>☕</span>
      ...
    </h4>
  {:else if $PROJECT.pipe_status == '-1'}
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
    margin-bottom: 20px;
  }
  p {
    color: var(--text-lighter);
    margin-bottom: 20px;
  }
  h4.side-note {
    margin-top: 60px;
    color: var(--text-medium);
  }
  .side-note span,
  .emoji {
    font-size: 30px;
    top: 4px;
    position: relative;
  }
</style>
