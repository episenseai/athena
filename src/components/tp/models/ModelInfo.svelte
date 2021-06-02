<script>
  import model_info from './model_info'
  import { models } from './store'
  export let id

  $: model = $models.find((el) => el.id === id)

</script>

<div class="container modelinfo">
  {@html model_info[model.id]}
  {#if true && $models && model.status === 'ERROR'}
    <h3 style="margin-top: 30px;">Only shown while debugging...</h3>
    <pre>{model.ERROR}</pre>
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

</style>
