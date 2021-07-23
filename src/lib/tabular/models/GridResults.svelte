<script>
  import { models } from './store'
  import { is_empty } from '$lib/utils'
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

    <div class="hyperchange">
      <h2>Adjust the model hyperparameters and rerun the model</h2>
      <p bind:this={error_elem} class:error={!valid_input}>{diagnostic_msg}</p>
      {#if !is_empty(model)}
        <table>
          <thead>
            <tr>
              <th>Parameters</th>
              <th>Default</th>
              <th>Supply params for run</th>
              <th>Info</th>
            </tr>
          </thead>
          <tbody>
            {#each Object.entries(model.possible_model_params) as [name, param] (name)}
              <tr class="param">
                <td>{name}</td>
                <td>{param.default}</td>
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

                <td class="input">
                  <div>
                    {#if 'possible_int' in param}
                      <pre>(integer) | min = {param["possible_int"][0]} | max = {param["possible_int"][1]}</pre>
                    {:else if 'possible_float' in param}
                      <pre>(float)&nbsp;&nbsp; | min = {param["possible_float"][0]} | max = {param["possible_float"][1]}</pre>
                    {:else if 'possible_str' in param}
                      <pre>(choices) | count = {param["possible_str"].length}</pre>
                    {:else if 'possible_list' in param}
                      <pre>(choices) | count = {param["possible_list"].length}</pre>
                    {/if}
                  </div>
                </td>
              </tr>
            {/each}
          </tbody>
        </table>
      {/if}
    </div>
  </div>
{/if}

<style>
  .hyperchange {
    margin-top: 40px;
  }
  .hyperchange h2 {
    padding-top: 20px;
    border-bottom: var(--light-border);
    width: 800px;
    margin: 0 auto 20px;
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
  }
  :global(.container.modelinfo) :global(h2) {
    margin-top: 10px;
  }
  table {
    width: auto;
    min-width: 800px;
    max-width: 98%;
    margin: 30px auto 0;
    border-width: 0 1px 0 1px;
    border-color: #eaecef;
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
  h2 {
    text-align: center;
    color: var(--text-light);
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
  .hyperchange p {
    font-size: 14px;
    color: green;
    text-align: center;
    padding: 5px 10px;
    border: 1px solid green;
    border-radius: 5px;
  }
  .hyperchange p.error {
    color: red;
    border: 1px solid red;
  }
  .hyperchange td:nth-child(3) {
    min-width: 300px;
    padding: 10px 20px;
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
  pre {
    background-color: transparent;
  }
  .hyperchange label {
    font-size: 14px;
    padding: 3px 0;
    font-weight: 500;
    color: var(--text-light);
    cursor: pointer;
  }
  .hyperchange td {
    min-width: 100px;
  }
</style>
