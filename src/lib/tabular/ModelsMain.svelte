<script>
  import modelsInfo from '../../routes/tabular/models/_mock/models.js'
  import { onMount } from 'svelte'
  import Models from './Models.svelte'
  import { modelType, models, activeModels, optimizeUsing } from './models/store'
  import Details from '../base/Details.svelte'
  import { TAB_ALL_MODELS_SERVICE } from '../../api/endpoints'
  import { fetch_json_GET } from '../../api/fetch'
  import { PROJECT } from './store'
  import { LOGIN } from '../auth/store'
  import { get } from 'svelte/store'

  async function all_models() {
    const response = await fetch_json_GET(
      TAB_ALL_MODELS_SERVICE(get(LOGIN).userid, get(PROJECT).id),
      'ALL MODELS',
    )
    if (!response) return false
    if (response.json.success) {
      const get_models = response.json.data.models
      const active_models = {}
      get_models.forEach((m) => {
        active_models[m.id] = false
      })
      activeModels.set(active_models)
      models.set(
        get_models.map((m) => ({ ...m, ...modelsInfo.models.find((el) => m.id === el.id) })),
      )
      modelType.set(response.json.data.modelType)
      optimizeUsing.set(response.json.data.optimizeUsing)
    }
  }

  onMount(async () => {
    await all_models()
    await PROJECT.sse_models_update()
    return async () => await PROJECT.sse_models_close()
  })
</script>

<!--
  <Details>
    <button
      on:click={async () => await PROJECT.get_model_by_id('24ee24ed-6174-4a79-bf53-215d6fbcf680')}
    >
      Get models data
    </button>
    <h4 slot="summary">get model by id</h4>
  </Details>
  <Details>
    <button on:click={async () => await PROJECT.sse_models_update()}>Get SSE</button>
    <h4 slot="summary">model updates</h4>
  </Details>
  <Details>
    <button on:click={all_models}>Get models data</button>
    <h4 slot="summary">models data</h4>
    <pre>{$modelType}</pre>
    <pre
      style="overflow: scroll; max-height:600px; margin-bottom: 5px;">
      {JSON.stringify($models, undefined, 2)}
    </pre>
  </Details>
-->

{#if $PROJECT.id && $PROJECT.current_stage === 'finalconfig:GET' && $PROJECT.pipe_status === '1'}
  <Models />
{/if}
