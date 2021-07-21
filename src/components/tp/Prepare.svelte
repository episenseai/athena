<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { snack } from '../../components/base/store/snack'
  import { tooltip } from '../SampleTooltip.svelte'
  import HeaderInfo from './prepare/HeaderInfo.svelte'
  import { GET_DATA, POST_DATA, PROJECT } from './store'
  import PipeWait from './PipeWait.svelte'
  import { get } from 'svelte/store'

  const dispatch = createEventDispatcher()

  onMount(async () => {
    if (get(PROJECT).current_stage === 'prepare:GET') {
      let success = await PROJECT.get_pipe({ current_stage: 'prepare:GET' })
      if (success) {
        $GET_DATA.data.target = undefined
      }
    }
  })

  //  POST data
  async function prepare_post() {
    if (get(PROJECT).current_stage !== 'prepare:GET') {
      await snack(
        'warning',
        `Currently processing data for the ${
          get(PROJECT).current_stage
        } stage. Can not move to the next stage.`,
      )
      return
    }
    // miminal configuration complete
    if (get(GET_DATA).data.target) {
      //let item = items.find(({ value }) => value === selected)
      // eslint-disable-next-line
      $POST_DATA = {
        stage: 'prepare:POST',
        data: {
          rows: get(GET_DATA).data.rows,
          target: get(GET_DATA).data.target,
          nextAvialableId: get(GET_DATA).data.nextAvialableId,
          cols: get(GET_DATA).data.cols.map(({ id, name, type, imputable }) => {
            return {
              id,
              name,
              type,
              imputable,
            }
          }),
        },
      }
      dispatch('postdata', {
        current_stage: 'prepare:GET',
        next_stage: 'prepare:POST',
      })
      // issue a POST request to the server
      // on success set PROJECT = POST
    } else {
      await snack('warning', 'select a target column to proceed')
    }
  }

  function smapleColumn(sample) {
    let x = sample.filter((elt) => elt !== '')

    return `${x.length === 0 ? '' : x.slice(0, 2).join(' , ').slice(0, 40)} ...`
  }
</script>

<button on:click={prepare_post} class="nextstage-btn">
  <span class="logo-global">&#x21d2;&nbsp;</span>
  Next stage
  <span class="logo-global">&nbsp;&#x21d2;</span>
</button>

{#if $PROJECT && $PROJECT.current_stage === 'prepare:GET' && $GET_DATA.stage === 'prepare:GET'}
  <div class="input-stage">
    <table>
      <thead>
        <tr>
          <th>
            id
            <HeaderInfo about={'id'} />
          </th>
          <th>
            column
            <HeaderInfo about={'column'} />
          </th>
          <th>
            data type
            <HeaderInfo about={'datatype'} />
          </th>
          <th>
            imputable
            <HeaderInfo about={'imputable'} />
          </th>
          <th>
            sample values
            <HeaderInfo about={'samplevalues'} />
          </th>
        </tr>
      </thead>
      <tbody>
        {#each $GET_DATA.data.cols as { id, name, type, imputable, sample } (id)}
          <tr class:selectedTarget={id === $GET_DATA.data.target}>
            <td>
              {id}
              {#if id === $GET_DATA.data.target}<span class="tag-target">TARGET</span>{/if}
            </td>
            <td>{name}</td>
            <td>
              <select bind:value={type}>
                {#each $GET_DATA.data.typeConversion[type] as dataType}
                  <option value={dataType}>{dataType}</option>
                {/each}
              </select>
            </td>
            <td>
              <label class="switch">
                <input type="checkbox" bind:checked={imputable} />
                <span class="toggle" />
              </label>
            </td>
            <td use:tooltip={{ sample, translateX: '-60px', heading: name }}
              >{smapleColumn(sample)}</td
            >
          </tr>
        {/each}
      </tbody>
    </table>

    <aside>
      <h2>Model Target</h2>
      <p>
        Off all the columns in the input data, select the one which you want the model to predict.
      </p>
      <ul>
        <li>
          For
          <strong>Category</strong>
          variable, it will result in a
          <strong>Classification Model</strong>
        </li>
        <li>
          For <strong>Number</strong> variable, it will result in a
          <strong>Regression Model</strong>
        </li>
      </ul>
      <h3>Target Column</h3>
      <select bind:value={$GET_DATA.data.target}>
        <option value={undefined}>Select</option>
        {#each $GET_DATA.data.cols as { id, name } (id)}
          <option value={id}>{name}</option>
        {/each}
      </select>
    </aside>
  </div>
{:else if $PROJECT && $PROJECT.current_stage === 'prepare:POST'}
  <PipeWait />
{/if}

<style>
  .input-stage {
    display: flex;
    justify-content: space-around;
    align-items: stretch;
    margin-top: 24px;
  }
  aside {
    margin-left: 50px;
    flex: 1 350px;
  }
  td {
    padding: 4px 5px;
    text-align: left;
  }
  table {
    flex: 1 750px;
    margin-top: 10px;
  }
  thead tr:nth-child(1) th {
    padding: 0 5px;
    min-width: 85px;
  }
  th {
    max-width: 120px;
  }

  th:last-child,
  td:last-child {
    max-width: 330px;
    overflow-y: scroll;
  }
  td:nth-child(1),
  td:nth-child(4),
  td:nth-child(3) {
    text-align: center;
  }
  aside h2,
  aside h3 {
    margin: 0 0 8px 0;
    padding: 7px 16px;
    border-bottom: 1px solid var(--light11);
    font-size: 1.4em;
  }
  aside p,
  aside ul li {
    font-size: 14px;
    line-height: 1.6;
  }
  aside ul {
    margin-bottom: 18px;
  }
  thead {
    background-color: rgb(255, 248, 220);
  }
</style>
