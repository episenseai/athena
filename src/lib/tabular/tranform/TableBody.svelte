<script>
  import { GET_DATA } from '../store'
  import { onMount } from 'svelte'

  export let isNumber

  // weight assigned should be between 0 and 1    (246, 248, 250)
  const verifyWeight = ({ target }) => {
    if (isNumber(target.valueAsNumber)) {
      if (target.valueAsNumber > 1) target.value = 1
      else if (target.valueAsNumber < 0) target.value = 0
    }
  }

  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()

  function plotme(id) {
    plotID = id
    dispatch('plotly', {
      plotID: id,
    })
  }
  let plotID
  onMount(() => {
    plotID = $GET_DATA.data.target
    dispatch($GET_DATA.data.target)
  })

</script>

<tbody>
  {#each $GET_DATA.data.features as { id, name, weight, include, origin, type, stats } (id)}
    <tr
      on:click|stopPropagation={() => plotme(id)}
      title={'Click to view Data Plots of - ' + name}
      class:plotlyTarget={id === plotID}
    >
      <td>
        {id}
        {#if id === $GET_DATA.data.target}<span class="tag-target">TARGET</span>{/if}
      </td>
      <td>{name}</td>
      <td>
        <label class="switch">
          <input type="checkbox" bind:checked={include} />
          <span class="toggle" />
        </label>
      </td>
      <td>{type}</td>
      <td>
        <input
          type="number"
          bind:value={weight}
          min="0.0"
          max="1.0"
          step="0.1"
          on:input={verifyWeight}
        />
      </td>
      <td>{type === 'Category' ? stats.unique : ''}</td>
      <td>{stats.missing}</td>
      <td>{type === 'Number' ? stats.correlation : ''}</td>
      <td>{type === 'Number' ? stats.min : ''}</td>
      <td>{type === 'Number' ? stats.mean : ''}</td>
      <td>{type === 'Number' ? stats.median : ''}</td>
      <td>{type === 'Number' ? stats.max : ''}</td>
      <td>{type === 'Number' ? stats.std : ''}</td>
    </tr>
  {/each}
</tbody>

<style>
  [type='number'] {
    padding: 2px 0 2px 10px;
    border: 1px solid var(--light12);
    width: 52px;
    border-radius: 4px;
  }
  td:nth-child(2),
  td:nth-child(4) {
    cursor: pointer;
    padding-left: 5px;
    padding-right: 2px;
  }
  td:nth-child(2) {
    text-align: left;
  }

  .plotlyTarget {
    background-color: var(--light5);
  }

</style>
