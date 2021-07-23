<script>
  import { models } from './store'
  import { is_empty } from '$lib/utils'
  export let id

  $: model = $models.find((el) => el.id === id)
  let changed_hparams_test = {}
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
      {#if !is_empty(model)}
        {#each Object.entries(model.possible_model_params) as [name, param] (name)}
          <pre>{name}</pre>
          <pre>{JSON.stringify(param)}</pre>
        {/each}
      {/if}
    </div>

    <table>
      <thead>
        <tr>
          <th>Parameters</th>
          <th>Default Value</th>
          <th>Possible Values</th>
          <th>Input Value</th>
        </tr>
      </thead>
      {#if model.possible_model_params}
        <tbody>
          {#each Object.keys(model.possible_model_params) as param}
            <tr class="param">
              <td>{JSON.stringify(param)}</td>
              <td>{JSON.stringify(model.possible_model_params[param].default)}</td>
              {#each Object.keys(model.possible_model_params[param]) as paramvalues}
                {#if paramvalues !== 'default'}
                  <td>{JSON.stringify(model.possible_model_params[param][paramvalues])}</td>
                {/if}
                {#if paramvalues === 'possible_str'}
                  <td>
                    <select bind:value={changed_hparams_test[param]}>
                      {#each model.possible_model_params[param][paramvalues] as select_option}
                        <option value={select_option}>
                          {select_option}
                        </option>
                      {/each}
                    </select>
                  </td>
                {/if}
                {#if paramvalues === 'possible_list'}
                  <td>
                    <select bind:value={changed_hparams_test[param]}>
                      {#each model.possible_model_params[param][paramvalues] as select_option}
                        <option value={select_option}>
                          {select_option}
                        </option>
                      {/each}
                    </select>
                  </td>
                {/if}
                {#if paramvalues === 'possible_int'}
                  <td><input type="number" bind:value={changed_hparams_test[param]} /></td>
                {/if}
                {#if paramvalues === 'possible_float'}
                  <td><input type="number" bind:value={changed_hparams_test[param]} /></td>
                {/if}
              {/each}
              {#if 'possible_str' in Object.keys(param)}
                <td>{JSON.stringify(param.possible_str)}</td>
              {/if}
              {#if 'possible_int' in Object.keys(param)}
                <td>{JSON.stringify(param.possible_int)}</td>
                <td><input type="number" bind:value={changed_hparams_test[param]} /></td>
              {/if}
              {#if 'possible_float' in Object.keys(param)}
                <td>{JSON.stringify(param.possible_float)}</td>
                <td><input type="number" bind:value={changed_hparams_test[param]} /></td>
              {/if}
              {#if 'possible_list' in Object.keys(param)}
                <td>{JSON.stringify(param.possible_list)}</td>
              {/if}
            </tr>
          {/each}
        </tbody>
      {/if}
    </table>
  </div>
{/if}

<style>
  .hyperchange {
    margin-top: 50px;
    border-top: var(--light-border);
  }
  .hyperchange h2 {
    padding-top: 20px;
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
    margin-left: auto;
    margin-right: auto;
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
</style>
