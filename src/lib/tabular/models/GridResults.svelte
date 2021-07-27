<script>
  import { models } from './store'
  import { is_empty } from '$lib/utils'
  import { get } from 'svelte/store'
  import { PROJECT } from '$lib/tabular/store'
  import { snack } from '$lib/base/snack'
  export let id

  $: model = $models.find((el) => el.id === id)
  let changed_hparams_test = {}

  function validate(input, possible_type, options = {}) {
    let type
    let elems = input
      .split(',')
      .map((s) => s.trim())
      .filter((item) => item)

    if (possible_type == 'possible_int') {
      elems = elems.map((x) => {
        if (/^[-+]?(\d+|Infinity)$/.test(x)) {
          return parseInt(x)
        } else {
          return NaN
        }
      })
      type = 'integer'
    } else if (possible_type == 'possible_float') {
      elems = elems.map((x) => parseFloat(x))
      type = 'float'
    } else {
      console.log('Type Not supported')
      return [false, [], '']
    }

    for (const [i, elem] of elems.entries()) {
      if (isNaN(elem) || !isFinite(elem)) {
        return [false, [], `elem '${i}' error | not an ${type}`]
      }
      if (elem < options.min) {
        return [false, [], `elem '${i}' error | ${elem} < ${options.min} (min)`]
      }
      if (elem > options.max) {
        return [false, [], `elem '${i}' error | ${elem} > ${options.max} (max)`]
      }
    }

    if (elems.length > 5) {
      return [false, [], `total number of variations (${elems.length}) > 5`]
    }

    return [true, elems, '']
  }

  let error_elem
  let diagnostic_msg = 'Diagnostics | Values of hyperparameters are valid'
  let valid_input = true

  // Rebuild the model with the user provided hyperparameters
  async function hyper_build(id) {
    let model = get(models).find((el) => el.id === id)

    if (is_empty(model) || !model.status) {
      await snack('error', 'Invalid model')
      return
    }

    if (!['DONE', 'ERROR', 'CANCELLED'].find((el) => el === model.status)) {
      await snack('error', `Model is in ${model.status} state. Could not rerun.`)
      return
    }

    const hyperparams = {}
    const possible_params = model.possible_model_params
    let combinations = 1
    for (const [name, param] of Object.entries(possible_params)) {
      if (!param.choices || param.choices.length == 0) {
      } else {
        hyperparams[name] = param.choices
        combinations = combinations * param.choices.length
      }
    }

    if (combinations >= 16) {
      await snack('error', `Too many paramter comabinations for the run: total = ${combinations}`)
      return
    }

    let modelids = [id]
    let changed_hparams = {}
    changed_hparams[id] = hyperparams

    let res = await PROJECT.model_build(modelids, changed_hparams)
    if (res) {
      models.update((ms) => {
        const new_ms = ms.map((m) => {
          if (m.id === id) {
            m.status = 'RUNNING'
          }
          return m
        })
        return new_ms
      })
      await PROJECT.sse_models_update(true)
    }
  }
</script>

{#if !is_empty($models) && model && model.grid_results}
  <!--
    <pre>{JSON.stringify(model.possible_model_params)}</pre>
    <pre>{JSON.stringify(changed_hparams_test)}</pre>
  -->
  <div class="container modelinfo">
    <h2>
      The best score for this model is
      <span class="best-score"><b>{model.grid_results.best_score}.</b></span>
    </h2>

    <div class="tb-container">
      <table>
        <thead>
          <tr>
            <th>parameters</th>
            <th>best setting</th>
          </tr>
        </thead>
        <tbody>
          {#each model.grid_results.best_params as param}
            <tr class="param">
              <td>{JSON.stringify(param[0], undefined, 2)}</td>
              <td>{JSON.stringify(param[1], undefined, 2)}</td>
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <h2>
      Results for all parameter combinations
      {#if model.grid_results.cvresult_list[0] && model.grid_results.cvresult_list[0].length}
        <span class="best-score"
          ><b>(total = {model.grid_results.cvresult_list[0].length - 1})</b></span
        >
      {/if}
    </h2>
    <div class="tb-container">
      <table>
        <thead>
          <tr>
            <th>parameters</th>
            <th colspan="100%">all ran settings</th>
          </tr>
        </thead>
        <tbody>
          {#each model.grid_results.cvresult_list as element, i}
            <tr class={model.grid_results.best_params.length >= i + 1 ? 'param' : ''}>
              {#each element as elem}
                <td class={elem === model.grid_results.best_score ? 'best-score' : ''}>{elem}</td>
              {/each}
            </tr>
          {/each}
        </tbody>
      </table>
    </div>

    <div class="hyperchange">
      <h2>Adjust the model hyperparameters and rerun the model</h2>
      <p bind:this={error_elem} class:error={!valid_input}>{diagnostic_msg}</p>
      <button class="rerun" on:click|stopPropagation={hyper_build(id)}
        >Rebuild with hyper-parameters</button
      >
      {#if !is_empty(model)}
        <table>
          <thead>
            <tr>
              <th>Parameters</th>
              <th>Default</th>
              <th>Supply params for run</th>
              <th>Type</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {#key model.status}
              {#each Object.entries(model.possible_model_params) as [name, param] (name)}
                <tr class="param">
                  <td>{name}</td>
                  <td class="def">{param.default}</td>
                  <td class="input">
                    <div>
                      {#if 'possible_int' in param}
                        <input
                          type="text"
                          placeholder="10, 0, 33"
                          on:input={(e) => {
                            let [passed, value, error_msg] = validate(
                              e.target.value,
                              'possible_int',
                              { min: param['possible_int'][0], max: param['possible_int'][1] },
                            )
                            valid_input = passed
                            if (!valid_input) {
                              error_elem.textContent = `Diagnostics | ${error_msg}`
                            } else {
                              error_elem.textContent = diagnostic_msg
                            }
                            param.choices = value
                          }}
                        />
                      {:else if 'possible_float' in param}
                        <input
                          type="text"
                          placeholder="1.2, 0.8, 20"
                          on:input={(e) => {
                            let [passed, value, error_msg] = validate(
                              e.target.value,
                              'possible_float',
                              { min: param['possible_float'][0], max: param['possible_float'][1] },
                            )
                            valid_input = passed
                            if (!valid_input) {
                              error_elem.textContent = `Diagnostics | ${error_msg}`
                            } else {
                              error_elem.textContent = diagnostic_msg
                            }
                            param.choices = value
                          }}
                        />
                      {:else if 'possible_str' in param}
                        {#each param['possible_str'] as choice}
                          <label>
                            <input type="checkbox" bind:group={param['choices']} value={choice} />
                            {choice}
                          </label>
                        {/each}
                      {:else if 'possible_list' in param}
                        {#each param['possible_list'] as choice}
                          <label>
                            <input type="checkbox" bind:group={param['choices']} value={choice} />
                            {choice}
                          </label>
                        {/each}
                      {/if}
                    </div>
                  </td>

                  <td class="extra">
                    <div>
                      {#if 'possible_int' in param}
                        <span>integer</span>
                      {:else if 'possible_float' in param}
                        <span>float</span>
                      {:else if 'possible_str' in param}
                        <span>choices</span>
                      {:else if 'possible_list' in param}
                        <span>choices</span>
                      {/if}
                    </div>
                  </td>
                  <td class="extra">
                    <div>
                      {#if 'possible_int' in param}
                        <span
                          >min = {param['possible_int'][0]}, max = {param['possible_int'][1]}</span
                        >
                      {:else if 'possible_float' in param}
                        <span
                          >min = {param['possible_float'][0]}, max = {param[
                            'possible_float'
                          ][1]}</span
                        >
                      {:else if 'possible_str' in param}
                        <span>count = {param['possible_str'].length}</span>
                      {:else if 'possible_list' in param}
                        <span>count = {param['possible_list'].length}</span>
                      {/if}
                    </div>
                  </td>
                </tr>
              {/each}
            {/key}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
{/if}

<style>
  h2 {
    padding-top: 20px;
    border-bottom: var(--light-border);
    width: 800px;
    margin: 0 auto 0;
    text-align: center;
  }
  .container {
    width: 100%;
    padding-left: 0.1em;
    padding-right: 0.1em;
    min-width: 800px;
    max-width: 99%;
    margin: auto;
    font-size: 13px;
    padding-top: 20px;
    grid-template-columns: repeat(16, 1fr);
    grid-auto-rows: minmax(40px, auto);
    overflow: hidden;
  }
  :global(.container.modelinfo) :global(h2) {
    margin-top: 10px;
  }
  .tb-container {
    overflow: scroll;
  }
  table {
    width: auto;
    min-width: 800px;
    max-width: 98%;
    margin: 30px auto 0;
    border-width: 0 1px 0 1px;
    border-color: #eaecef;
    margin-bottom: 20px;
  }
  td {
    padding: 6px;
    font-size: 13px;
  }
  td:nth-child(1) {
    color: var(--blue);
    font-size: 13px;
  }
  .param td:nth-child(1) {
    color: var(--pink);
  }
  thead {
    background-color: rgb(250, 248, 220);
  }

  .best-score {
    color: var(--green);
  }
  label {
    display: block;
    width: 100%;
  }
  td.input {
    text-align: left;
  }
  td.extra span {
    color: var(--pink);
  }
  .hyperchange {
    overflow: scroll;
  }
  .hyperchange table {
    margin-top: 20px;
    margin-bottom: 50px;
    min-width: 900px;
  }
  .hyperchange p {
    font-size: 14px;
    color: green;
    text-align: center;
    padding: 5px 10px;
    border-top: 1px solid green;
    border-bottom: 1px solid green;
    margin-top: 20px;
  }
  .hyperchange p.error {
    color: red;
    border-top: 1px solid red;
    border-bottom: 1px solid red;
  }
  .hyperchange td:nth-child(3) {
    min-width: 300px;
    padding: 6px 20px;
  }
  .hyperchange [type='text'] {
    height: 32px;
    padding: 5px 10px 7px 10px;
    background-color: transparent;
    border: var(--medium-border);
    outline: none;
    border-radius: 4px;
    font-weight: 400;
    font-size: 14px;
    line-height: 26px;
    width: 100%;
  }
  [type='text']:focus {
    border-color: #ffa27b;
  }
  .hyperchange label {
    font-size: 14px;
    padding: 2px 0;
    color: var(--text-dark);
    cursor: pointer;
  }
  td.def {
    font-size: 14px;
  }
  .hyperchange td {
    min-width: 100px;
  }
  button.rerun {
    margin: 20px auto 0;
    display: block;
    width: 300px;
  }
</style>
