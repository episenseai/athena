<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { snack } from '$lib/base/snack'
  import CVLayout from './build/CVLayout.svelte'
  import { GET_DATA, POST_DATA, PROJECT } from './store.js'
  import PipeWait from './PipeWait.svelte'
  import { get } from 'svelte/store'

  const dispatch = createEventDispatcher()

  //  POST data
  async function prepare_post() {
    if (get(PROJECT).current_stage !== 'build:GET') {
      await snack(
        'warning',
        `Currently processing data for the ${
          get(PROJECT).current_stage
        } stage. Can not move to the next stage.`,
      )
      return
    }
    // miminal configuration complete
    if (get(GET_DATA).data.optimizeUsing) {
      //let item = items.find(({ value }) => value === selected)
      // eslint-disable-next-line
      $POST_DATA = {
        stage: 'build:POST',
        data: {
          cv: get(GET_DATA).data.cv,
          sampleUsing: get(GET_DATA).data.sampleUsing,
          splitUsing: get(GET_DATA).data.splitUsing,
          optimizeUsing: get(GET_DATA).data.optimizeUsing,
          downsampling: get(GET_DATA).data.downsampling,
        },
      }
      dispatch('postdata', {
        current_stage: 'build:GET',
        next_stage: 'build:POST',
      })
      // issue a POST request to the server
      // on success set PROJECT = POST
    } else {
      await snack('warning', 'select an optimization metric')
    }
  }

  // let buildData
  $: summary = $GET_DATA.stage === 'build:GET' ? $GET_DATA.data.summary : undefined

  onMount(async () => {
    if (get(PROJECT).current_stage === 'build:GET') {
      let success = await PROJECT.get_pipe({ current_stage: 'build:GET' })
      if (success) {
        // unselect default optmization metric
        $GET_DATA.data.optimizeUsing = undefined
      }
    }
  })
</script>

<button on:click={prepare_post} class="nextstage-btn">
  <span class="logo-global">&#9654;</span>
  Build current stage
</button>

{#if $PROJECT && $PROJECT.current_stage === 'build:GET' && $GET_DATA.stage === 'build:GET'}
  <div class="build-stage">
    <main>
      <h1>Build Configuration</h1>

      <div class="summary1">
        <h3>Summary</h3>
        <p>Total Number of Features: <span>&nbsp;{summary.features}</span></p>
        <p>Selected Features for Training: <span>&nbsp;{summary.includedFeatures}</span></p>
        <p>Rows: <span>&nbsp;{summary.rows}</span></p>
        <p>Target Feature: <span>&nbsp;{summary.target}</span></p>
        <p>Model Type: <span>&nbsp;{summary.modelType}</span></p>
      </div>

      <div>
        <h3>Sampling Method</h3>
        <div>
          {#each $GET_DATA.data.samplingMethods as method}
            <button
              on:click|stopPropagation={() => ($GET_DATA.data.sampleUsing = method)}
              class:sample={$GET_DATA.data.sampleUsing === method}
            >
              {method}
            </button>
          {/each}
        </div>
      </div>

      <div>
        <h3>Data Split</h3>
        <div>
          {#each $GET_DATA.data.splitMethods as method}
            <button
              on:click|stopPropagation={() => ($GET_DATA.data.splitUsing = method)}
              class:split={$GET_DATA.data.splitUsing === method}
            >
              {method}
            </button>
          {/each}
        </div>
      </div>

      {#if $GET_DATA.data.splitUsing === 'Cross Validation'}
        <div>
          <h3>Number of CV Folds (k-fold)</h3>
          <p>
            Cross-Validation (CV) folds determine how the data is split between training, validation
            and holdout sets. Number of folds should be between 2-20.
          </p>
          <label class="cv">
            <input type="number" bind:value={$GET_DATA.data.cv.folds} min="2" max="20" step="1" />
            <input type="range" bind:value={$GET_DATA.data.cv.folds} min="2" max="20" step="1" />
            <span>{$GET_DATA.data.cv.folds}-fold cross-validation</span>
          </label>
        </div>

        <div>
          <h3>Holdout Set (%)</h3>
          <p>
            Holdout set is used to caculate the final model accuracy. Valued should be between 5% -
            50%.
          </p>
          <label class="holdout">
            <input type="number" bind:value={$GET_DATA.data.cv.holdout} min="5" max="50" step="1" />
            <input type="range" bind:value={$GET_DATA.data.cv.holdout} min="5" max="50" step="1" />
            <span>{$GET_DATA.data.cv.holdout}% data as holdout</span>
          </label>
        </div>
      {:else if $GET_DATA.data.splitUsing === 'Training Validation Holdout'}
        <div class="tvh">
          <p>Training Set: 70%</p>
          <p>Validation Set: 10%</p>
          <p>Holdout Set: 20%</p>
        </div>
      {/if}

      <div>
        <h3>Downsampling</h3>
        <label class="switch">
          <input type="checkbox" bind:checked={$GET_DATA.data.downsampling} />
          <span class="toggle" />
        </label>
        <span>Downsample data to lower the training time of the model.</span>
      </div>
    </main>

    <aside>
      <h1>Model Building</h1>

      <div>
        <h3>Optimization Metric</h3>
        <p>
          Metric used to penalize the difference between predicted and target values on validation
          set.
        </p>
        <label class="metric">
          <select bind:value={$GET_DATA.data.optimizeUsing}>
            <option value={undefined}>Select a metric</option>
            {#each $GET_DATA.data.metrics as metric}
              <option value={metric}>{metric}</option>
            {/each}
          </select>
        </label>
      </div>
      <h3>Data split Visualization</h3>
      <CVLayout {...$GET_DATA.data.cv} />
    </aside>
  </div>
{:else if $PROJECT && $PROJECT.current_stage === 'build:POST'}
  <PipeWait />
{/if}

<style>
  main button.sample,
  main button.split {
    color: var(--text-dark);
    background-color: var(--light6);
  }
  .build-stage {
    display: flex;
    justify-content: center;
    align-items: stretch;
    margin-top: 24px;
  }
  main {
    flex: 2 2 800px;
    padding: 0 12px;
  }
  main > div {
    padding: 5px 0 10px;
    border-bottom: 1px solid rgba(97, 125, 144, 0.2);
  }
  aside {
    padding: 0 12px;
    flex: 1 1 500px;
  }
  aside div {
    margin: 10px 0;
    padding-bottom: 8px;
  }

  h1 {
    font-size: 1.45em;
    border-bottom: 1px solid rgba(97, 125, 144, 0.2);
    padding-bottom: 5px;
  }
  h3 {
    font-size: 1.2em;
  }
  p {
    margin-bottom: 3px;
  }
  label {
    padding-top: 10px;
    display: block;
  }
  .summary1 span {
    font-family: Inter;
    color: var(--text-dark);
  }
  main button {
    border-radius: 0;
    background-color: transparent;
    border-left: 0px;
    height: 32px;
    padding: 5px 40px;
  }
  main button:first-child {
    border-radius: 3px 0 0 3px;
    border-left: 1px solid var(--pink);
  }
  main button:last-child {
    border-radius: 0 3px 3px 0;
  }
  main button:hover {
    background-color: var(--light2);
  }
  main button:only-child {
    border-radius: 3px;
  }
  input[type='number'] {
    padding: 5px;
    width: 50px;
  }
  input[type='range'] {
    position: relative;
    top: 4px;
    width: 250px;
    margin-left: 10px;
    margin-right: 5px;
  }
  .cv span,
  .holdout span,
  .switch + span {
    font-family: Inter;
    margin-left: 20px;
  }
  .switch,
  .metric {
    display: inline-block;
  }
  .tvh p {
    font-family: Inter;
  }
</style>
