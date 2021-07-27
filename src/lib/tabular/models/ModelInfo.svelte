<script>
  import model_info from './model_info'
  import { dev } from '$app/env'
  import { models } from './store'
  export let id

  $: model = $models.find((el) => el.id === id)
</script>

<div class="container modelinfo">
  {@html model_info[model.id]}
  {#if $models && model.status === 'ERROR'}
    <h3>An error occurred while building the model</h3>
    {#if dev}
      <pre>{model.ERROR}</pre>
    {/if}
  {/if}
</div>

<style>
  .container {
    width: 100%;
    padding-left: 1em;
    padding-right: 1em;
    max-width: 800px;
    margin: auto;
    font-size: 13px;
    padding-top: 20px;
  }
  :global(.container.modelinfo) :global(h2) {
    margin-top: 20px;
  }
  :global(.container.modelinfo) :global(p) {
    font-size: 13px;
    max-width: 660px;
    margin: auto;
  }
  h3 {
    margin: 20px 0;
    color: red;
  }
  pre {
    padding: 15px 5px;
    overflow: scroll;
  }
</style>
