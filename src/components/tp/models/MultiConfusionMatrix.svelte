<script>
  import { models } from './store'
  export let id

  $: model = $models.find((el) => el.id === id)

  const sumFunc = (acc, cur) => acc + cur
  $: cm = model.cm
  $: sumRows = cm.map((row) => row.reduce(sumFunc))
  $: cm_transpose = cm[0].map((col, i) => cm.map((row) => row[i]))
  $: sumCols = cm_transpose.map((row) => row.reduce(sumFunc))
  $: precision = cm.map((row, i) => row[i] / sumRows[i])
  $: recall = cm.map((row, i) => row[i] / sumCols[i])
  $: f1score = cm.map((_, i) => (2 * sumCols[i] * sumRows[i]) / (sumCols[i] + sumRows[i]))
  $: totalTotal = sumCols.reduce(sumFunc)
  $: avgPrecision = (precision.reduce(sumFunc) / precision.length).toFixed(2)
  $: avgRecall = (recall.reduce(sumFunc) / recall.length).toFixed(2)
  $: avgF1score = (f1score.reduce(sumFunc) / f1score.length).toFixed(2)

</script>

<div>
  <table>
    <thead>
      <tr>
        <th colspan="2">SIGNIFICANT MODEL MTERICS (Multi-Class Classification)</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Average Precision</td>
        <td>{avgPrecision}</td>
      </tr>
      <tr>
        <td>Average Recall</td>
        <td>{avgRecall}</td>
      </tr>
      <tr>
        <td>Average F1-Score</td>
        <td>{avgF1score}</td>
      </tr>
    </tbody>
  </table>
  <table class="main">
    <thead>
      <tr>
        <th rowspan="2" colspan="2" class="vestig1" style="border-top: 1px solid transparent;" />
        <th colspan={model.classes.length} class="headers">GROUND TRUTH</th>
      </tr>
      <tr>
        {#each model.classes as cl}
          <th class="actualClass headers"><span>{cl}</span></th>
        {/each}
        <th>TOTAL</th>
      </tr>
      {#each cm as row, i (model.classes[i])}
        <tr>
          {#if i === 0}
            <th rowspan={model.classes.length} class="pClass headers"><span>MODEL PREDICTION</span></th>
          {/if}
          <th class="headers">{model.classes[i]}</th>
          {#each row as col, j (j)}
            <td class:pos={i === j}>{col}</td>
          {/each}
          <td class="rowTotal">{sumRows[i]}</td>
        </tr>
      {/each}
      <tr class="total">
        <th rowspan="4" style=" border-bottom: 1px solid transparent;" />
        <th>TOTAL</th>
        {#each sumCols as col}
          <td>{col}</td>
        {/each}
        <td>{totalTotal}</td>
      </tr>
      <tr class="precision">
        <th>PRECISION</th>
        {#each precision as p, i (i)}
          <td>{p.toFixed(2)}</td>
        {/each}
        <td>{avgPrecision}</td>
      </tr>
      <tr class="recall">
        <th>RECALL</th>
        {#each recall as re, i (i)}
          <td>{re.toFixed(2)}</td>
        {/each}
        <td>{avgRecall}</td>
      </tr>
      <tr class="f1score">
        <th>F1-SCORE</th>
        {#each f1score as f1, i (i)}
          <td>{f1.toFixed(2)}</td>
        {/each}
        <td>{avgF1score}</td>
      </tr>
    </thead>
  </table>
</div>

<style>
  div {
    width: 100%;
    overflow: scroll;
  }
  th,
  thead tr:nth-child(1) th {
    padding: 4px 15px;
    line-height: 1.8em;
    color: var(--text-medium);
  }
  tr th.actualClass,
  .actualClass + th {
    margin: auto;
    position: relative;
    height: 170px;
  }
  .main th:last-of-type,
  .main td:last-of-type {
    border-right: var(--gentle-border);
  }
  th.pClass {
    min-width: 36px;
    border-left: var(--gentle-border);
  }
  .headers {
    background-color: rgba(246, 241, 228, 0.3);
  }

  .total td,
  .rowTotal {
    background-color: rgba(180, 247, 37, 0.3);
  }
  .total td:last-of-type {
    background-color: rgba(215, 240, 162, 1);
    color: #c05726;
  }
  .precision td {
    background-color: rgba(246, 106, 10, 0.1);
  }
  .precision td:last-of-type {
    background-color: rgba(246, 106, 10, 0.3);
    color: #c05726;
  }
  .recall td {
    background-color: rgba(212, 197, 249, 0.2);
  }
  .recall td:last-of-type {
    background-color: rgba(212, 197, 249, 0.7);
    color: #c05726;
  }
  .f1score td {
    background-color: rgba(203, 233, 255, 0.4);
  }
  .f1score td:last-of-type {
    background-color: rgba(203, 233, 255, 1);
    color: #c05726;
  }
  .pos {
    background-color: rgba(255, 253, 194, 0.9);
    color: #c05726;
  }
  table:first-child,
  table:first-child tr,
  table:first-child th {
    border: var(--gentle-border);
  }
  table:first-child {
    margin: 30px auto;
    width: 470px;
  }
  table:first-child td:last-child {
    color: #c05726;
  }
  .actualClass,
  .pClass {
    position: relative;
  }
  .actualClass span,
  .pClass span {
    font-family: Inter;
    color: var(--text-medium);
    transform: rotate(270deg) translate(15px, -78px);
    display: inline-block;
    text-align: initial;
    width: 156px;
    position: absolute;
  }
  .pClass span {
    font-size: 0.95em;
    color: var(--text-light);
  }
  table {
    margin: auto;
  }
  th,
  .actualClass span {
    font-size: 0.9em;
    letter-spacing: 0.02em;
    color: var(--text-light);
  }
  .actualClass span {
    font-size: 0.95em;
  }
  td {
    padding: 4px;
  }

</style>
