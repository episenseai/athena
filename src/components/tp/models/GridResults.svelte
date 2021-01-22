<script>
  import { models } from './store'
  export let model
</script>

{#if model.grid_results && $models}
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
  </div>
{/if}

<style>
  .container {
    width: 100%;
    padding-left: 1em;
    padding-right: 1em;
    max-width: 800px;
    margin: auto;
    font-size: 13px;
    padding-top: 20px;
    grid-template-columns: repeat(16, 1fr);
    grid-auto-rows: minmax(40px, auto);
  }
  :global(.container.modelinfo) :global(h2) {
    margin-top: 20px;
  }
  table {
    width: 100%;
    margin: 30px auto;
    border-style: solid;
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
    background-color: rgb(255, 248, 220);
  }
  h2 {
    text-align: center;
    text-decoration: underline;
  }
  .best-score {
    color: var(--green);
  }
</style>
