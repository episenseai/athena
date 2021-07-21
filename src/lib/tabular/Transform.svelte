<script>
  import { onMount, createEventDispatcher } from 'svelte'
  import { snack } from '$lib/base/snack'
  import TableHead from './tranform/TableHead.svelte'
  import Plotly from './tranform/Plotly.svelte'
  import TableBody from './tranform/TableBody.svelte'
  import { GET_DATA, POST_DATA, PROJECT } from './store'
  import PipeWait from './PipeWait.svelte'
  import { get } from 'svelte/store'

  const dispatch = createEventDispatcher()

  //  POST data
  async function prepare_post() {
    if (get(PROJECT).current_stage !== 'transform:GET') {
      await snack(
        'warning',
        `Currently processing data for the ${
          get(PROJECT).current_stage
        } stage. Can not move to the next stage.`,
      )
      return
    }
    // eslint-disable-next-line
    if (true || get(PROJECT).current_stage === 'transform:GET') {
      //let item = items.find(({ value }) => value === selected)
      // eslint-disable-next-line
      $POST_DATA = {
        stage: 'transform:POST',
        data: {
          rows: get(GET_DATA).data.rows,
          target: get(GET_DATA).data.target,
          features: get(GET_DATA).data.features.map(
            ({ id, name, weight, include, origin, type }) => {
              return {
                id,
                name,
                weight,
                include,
                origin,
                type,
              }
            },
          ),
        },
      }
      dispatch('postdata', {
        current_stage: 'transform:GET',
        next_stage: 'transform:POST',
      })
      // issue a POST request to the server
      // on success set PROJECT = POST
    }
  }

  let plotlyData

  function plotlyDraw(plotID) {
    let feature = get(GET_DATA).data.features.find(({ id }) => id === plotID)
    plotlyData = {
      quantile: feature.type === 'Number' ? feature.stats.quantile : [],
      bins: feature.stats.bins,
      //dataType: feature.type,
      name: feature.name,
    }
  }
  // check if the value is a finite number and not a NaN
  const isNumber = (x) => typeof x === 'number' && !isNaN(x) && isFinite(x)

  //get data
  onMount(async () => {
    if (get(PROJECT).current_stage === 'transform:GET') {
      await PROJECT.get_pipe({ current_stage: 'transform:GET' })
      if (get(GET_DATA).stage === 'transform:GET') {
        plotlyDraw(get(GET_DATA).data.target)
      }
    }
  })
</script>

<button on:click={prepare_post} class="nextstage-btn">
  <span class="logo-global">&#x21d2;&nbsp;</span>
  Next stage
  <span class="logo-global">&nbsp;&#x21d2;</span>
</button>

{#if $PROJECT && $PROJECT.current_stage === 'transform:GET' && $GET_DATA.stage === 'transform:GET'}
  <div class="transform-container">
    <div class="plots-container">
      {#if plotlyData}
        <Plotly {...plotlyData} />
      {/if}
    </div>
    <div class="table-container">
      <table>
        <TableHead {isNumber} />
        <TableBody {isNumber} on:plotly={(e) => plotlyDraw(e.detail.plotID)} />
      </table>
    </div>
  </div>
{:else if $PROJECT && $PROJECT.current_stage === 'transform:POST'}
  <PipeWait />
{/if}

<style>
  .transform-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    margin-top: 24px;
  }
  .plots-container {
    min-height: 390px;
  }
  .table-container {
    width: 100%;
    overflow-y: scroll;
  }
  table {
    width: max-content;
    min-width: 100%;
  }
</style>
