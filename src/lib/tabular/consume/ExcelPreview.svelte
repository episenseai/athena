<script>
  export let rawCSV = ''
  $: tableData = rawCSV
    .trimEnd()
    .split('\n')
    .map((line) => line.split(','))
  $: rows = tableData.length - 1
  $: cols = tableData[0].length
</script>

<div class="csv-table">
  <table>
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
    margin-top: 10px;
  }
  table {
    width: 100%;
    font-size: 12px;
  }
  thead tr:nth-child(1) th {
    padding: 0 6px;
  }
  td {
    padding: 4px;
    font-size: 12px;
  }
  thead {
    overflow-y: auto;
    background-color: #eeeeee;
  }
  thead th {
    position: sticky;
    top: 0;
    background: #eeeeee;
    height: 46px;
    font-weight: 700;
  }
</style>
