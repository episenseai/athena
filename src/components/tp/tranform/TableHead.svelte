<script>
  import { tooltip } from '../../SampleTooltip.svelte'
  import { GET_DATA } from '../store'
  import { headers } from './headers.js'

  let currentSort = 'id'

  export let isNumber

  // change the sort order based on ascend
  const sortOrder = (output, ascend) => (output === 0 ? 0 : ascend ? output : -output)

  // handles sorting of the columns
  function handleTransformSort(column, ascend) {
    // sort numbers and booleans
    if (['id', 'weight', 'include'].includes(column)) {
      $GET_DATA.data.features = $GET_DATA.data.features.sort((f1, f2) => sortOrder(f1[column] - f2[column], ascend))
      return
    }

    // sort string
    if (['name', 'type', 'origin'].includes(column)) {
      $GET_DATA.data.features = $GET_DATA.data.features.sort((f1, f2) =>
        sortOrder(f1[column].localeCompare(f2[column]), ascend)
      )
      return
    }

    // sort numbers in the "stats" which can have undefined values
    // undefined values are pushed to the end of the stack
    if (['min', 'mean', 'median', 'max', 'std', 'correlation', 'unique', 'missing'].includes(column)) {
      // get features for which the property is a sortable number
      let comparable = $GET_DATA.data.features.filter((f) => isNumber(f.stats[column]))
      // rest of the non sortable features
      let notComparable = $GET_DATA.data.features.filter((f) => !isNumber(f.stats[column]))
      // sort the features
      comparable.sort((f1, f2) => sortOrder(f1.stats[column] - f2.stats[column], ascend))
      // concat the sorted and unsortable features

      $GET_DATA.data.features = comparable.concat(notComparable)
    }
  }
</script>

<thead>
  <tr class="noselect">
    {#each headers as { name, column, ascend, info }, i (column)}
      <th>
        <span class="help" use:tooltip={{ sample: [info], heading: name, translateX: '0px' }}>{name}</span>
        <span
          class="sort"
          class:currentSort={currentSort === column}
          on:click|stopPropagation={() => {
            currentSort = column
            handleTransformSort(column, ascend)
            headers[i].ascend = !ascend
          }}
          title={ascend ? 'Revesrse sort column: ' + name : 'Sort column: ' + name}>
          &nbsp;{ascend ? '▲' : '▼'}
        </span>
      </th>
    {/each}
  </tr>
</thead>

<style>
  tr:nth-child(2) th {
    padding: 3px 3px;
    line-height: 0;
  }
  tr:nth-child(1) th {
    border-bottom: none;
  }
  tr:nth-child(2) th {
    border-top: none;
  }
  tr:nth-child(3) th {
    padding: 0 3px;
  }
  .help {
    cursor: help;
    font-family: Inter;
    font-size: 11.5px;
    line-height: 3em;
    text-transform: uppercase;
    max-width: none;
    overflow-wrap: break-word;
  }
  .sort {
    cursor: pointer;
    font-size: 10px;
    color: rgba(97, 125, 144, 0.5);
  }
  th:hover .sort {
    color: var(--text-dark);
  }
  .sort.currentSort {
    color: var(--text-dark);
  }
  thead {
    background-color: rgb(255, 248, 220);
  }
</style>
