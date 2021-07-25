<script>
  import { PROJECT, GET_DATA } from './store'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'

  //get data
  onMount(async () => {
    if (get(PROJECT).current_stage === 'finalconfig:GET' && get(PROJECT).pipe_status === '0') {
      await PROJECT.get_pipe({ current_stage: 'finalconfig:GET' })
    }
  })

  async function handleBuild() {
    await PROJECT.model_build()
  }
</script>

{#if $PROJECT && $PROJECT.current_stage === 'finalconfig:GET' && $GET_DATA.stage === 'finalconfig:GET'}
  <div class="container">
    <h3>
      All the pipeline stages for
      <span>{$PROJECT.name}</span>
      successfully completed and merged.
      <span class="emoji">✔</span>
    </h3>
    <h4>
      <span>{$GET_DATA.data.filename}</span>
      contains a
      <span>{$GET_DATA.data.rows}</span>
      rows and
      <span>{$GET_DATA.data.features}</span>
      columns, of which
      <span>{$GET_DATA.data.includedFeatures}</span>
      will be used for building the models.
      <span>{$GET_DATA.data.model_type === 'regressor' ? 'Numerical' : 'Categorical'}</span>
      variable
      <span>{$GET_DATA.data.target_name}</span>
      is the target of the learning algorithm.
      <span>{$GET_DATA.data.cv.holdout}%</span>
      of the data will be in holdout set and the remaining
      <span>{100 - $GET_DATA.data.cv.holdout}%</span>
      will be used for training the models.
      <span>{$GET_DATA.data.cv.folds}-fold</span>
      cross-validation will be used to evaluate the models.
    </h4>
    <button on:click={handleBuild}>
      Start Building
      <span>{$GET_DATA.data.model_type_name}</span>
      Models
      <span class="logo-global">→</span>
    </button>
  </div>
{/if}

<style>
  .container {
    width: 700px;
    margin: 80px auto 10px;
    text-align: center;
  }
  button {
    margin-top: 10px;
    width: 360px;
    color: var(--text-dark);
  }
  span {
    color: var(--lobster);
  }
  h3 {
    margin-bottom: 30px;
    padding-bottom: 5px;
    border-bottom: 2px solid var(--light-border-color);
  }
  h3 span {
    color: var(--pink);
  }
  h4 {
    margin-bottom: 22px;
    color: var(--text-light);
  }
  h3 span.emoji {
    font-size: 14px;
    color: var(--green);
  }
</style>
