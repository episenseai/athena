<script>
  export let rawCSV = ''
  $: tableData = rawCSV
    .trimEnd()
    .split('\n')
    .map((line) => line.split(','))
  $: rows = tableData.length - 1
  $: cols = tableData[0].length
</script>

<h4>PREVIEW (first few rows)</h4>
<div class="csv-table">
  <table>
    <!--caption>Preview</caption-->
    <thead>
      <tr>
        {#each tableData[0] as colHeader}
          <th>{colHeader}</th>
        {/each}
      </tr>
    </thead>
    <tbody>
      {#each tableData.slice(1) as row}
        <tr>
          {#each row as item}
            <td>{item}</td>
          {/each}
        </tr>
      {/each}
    </tbody>
  </table>
</div>

<style>
  .csv-table {
    overflow: scroll;
    width: 100%;
    height: calc(100vh - 430px);
  }
  table {
    width: 100%;
  }
  thead tr:nth-child(1) th {
    padding: 0 6px;
  }
  td {
    padding: 4px;
  }
  h4 {
    letter-spacing: 0.06em;
    padding: 8px 0 6px;
    text-align: center;
    border-top: 1px solid var(--light11);
    color: var(--text-medium);
    font-size: 0.95em;
  }
  thead,
  h4 {
    background-color: rgb(255, 248, 220);
  }
</style>
