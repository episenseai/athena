<script>
  import Container from '$lib/tabular/models/Container.svelte'
  import { models, modelType, activeModels, optimizeUsing } from '$lib/tabular/models/store'
  import { get } from 'svelte/store'
  import Spinner from '../Spinner.svelte'
  import Jumper from '../Jumper.svelte'
  import { PROJECT } from '$lib/tabular/store'
  import { is_empty } from '$lib/utils'
  import { snack } from '$lib/base/snack'
  import { isNumber } from '$lib/utils'

  // Issue a cancel request for the build job of the model
  async function cancel_model(id) {
    await PROJECT.cancel_model(id)
    let i = get(models).findIndex((el) => el.id === id)
    if (i !== -1) {
      let m = get(models)[i]
      if (m.status === 'WAIT' || m.status === 'RUNNING' || m.status === 'TRYCANCEL') {
        await PROJECT.get_model_by_id(id)
      }
    }
  }

  // Rebuild the model with the user provided hyperparameters
  async function rerun(id) {
    let model = get(models).find((el) => el.id === id)

    if (is_empty(model) || !model.status) {
      await snack('error', 'Invalid model')
      return
    }

    if (!['DONE', 'ERROR', 'CANCELLED'].find((el) => el === model.status)) {
      await snack('error', `Model is in ${model.status} state. Could not rerun.`)
      return
    }

    await snack('info', 'Building the model with default hyper-parameters.')
    let res = await PROJECT.model_build([id])

    if (res) {
      models.update((ms) => {
        const new_ms = ms.map((m) => {
          if (m.id === id) {
            m.status = 'RUNNING'
          }
          return m
        })
        return new_ms
      })
      await PROJECT.sse_models_update(true)
    }
  }

  let open = false
  $: if (Object.keys($activeModels).find((id) => $activeModels[id] == true)) {
    open = true
  } else {
    open = false
  }
  $: console.log($models)

  let ascend = false

  // change the sort order based on ascend
  const sortOrder = (output, ascend) => (output === 0 ? 0 : ascend ? output : -output)

  const get_metrics_val = (m) => {
    if (!m || !m.metrics || !m.metrics.val) return undefined
    return m.metrics.val
  }

  function sortby_metrics() {
    let ms = get(models)
    if (ms.length == 0) return

    // get features for which the property is a sortable number
    let comparable = ms.filter((m) => isNumber(get_metrics_val(m)))
    // rest of the non sortable features
    let notComparable = ms.filter((m) => !isNumber(get_metrics_val(m)))
    // sort the features
    comparable.sort((m1, m2) => sortOrder(get_metrics_val(m1) - get_metrics_val(m2), ascend))
    // concat the sorted and unsortable features

    models.set(comparable.concat(notComparable))
    // console.log(m.map((m) => m.metrics.val))
    ascend = !ascend
  }
</script>

{#if $PROJECT.current_stage && $modelType && $models && $models.length > 0}
  {#key ascend}
    <header>
      <div class="lsmod info">
        <h4 class="noselect">
          {$modelType === 'regressor'
            ? 'Regressor Models'
            : $modelType === 'classifier'
            ? 'Classifier Models'
            : 'Multi Classifier Models'}: ({$models.length} models)
        </h4>
        <button
          class:right={!open}
          class:down={open}
          on:click={() => {
            let x = get(activeModels)
            Object.keys(x).forEach((key, _) => {
              x[key] = false
            })
            $activeModels = x
          }}><span>Collapse all</span></button
        >
      </div>
      <h4 class="request noselect">Request</h4>
      <h4 class="status noselect">Status</h4>
      <h4 class="val noselect">
        {$optimizeUsing} <button class="sort" on:click={() => sortby_metrics()}>sort</button>
      </h4>
      <div class="empty" />
    </header>
    <main>
      {#each $models as { name, desc, id, metrics, status, classes } (id)}
        <section class:active={$activeModels[id]}>
          <div
            class="info"
            title={$activeModels[id]
              ? 'Click to hide the details'
              : 'Click to show the details of:  ' + name}
            on:click|preventDefault|stopPropagation={() => {
              let val = true
              if (get(activeModels)[id]) {
                val = false
              }
              activeModels.update((m_ids) => {
                m_ids[id] = val
                return m_ids
              })
            }}
          >
            <h3 class="name" class:right={!$activeModels[id]} class:down={$activeModels[id]}>
              {name}
              <div>
                {#if status === 'RUNNING'}
                  <Spinner speed={600} color={'rgb(232, 62, 140)'} />
                {:else if status === 'DONE'}
                  <div class="done">✔</div>
                {:else if status === 'WAIT'}
                  <Jumper width={'24px'} height={'16px'} background={'rgb(107, 81, 216)'} />
                {:else if status === 'TRYCANCEL'}
                  <div class="cancelled">x??</div>
                {:else if status === 'CANCELLED'}
                  <div class="cancelled">x</div>
                {:else if status === 'ERROR'}
                  <svg class="icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1
                    15h-2v-2h2v2zm0-4h-2V7h2v6z"
                    />
                  </svg>
                {/if}
              </div>
            </h3>
            <p>{desc}</p>
          </div>
          {#if status === 'DONE' || status === 'ERROR' || status === 'CANCELLED'}
            <button class="request request-rerun-btn" on:click|stopPropagation={rerun(id)}
              >Default Rebuild</button
            >
          {:else}
            <button class="request request-cancel-btn" on:click|stopPropagation={cancel_model(id)}
              >Cancel</button
            >
          {/if}
          <p class="status noselect">
            {#if status === 'DONE'}
              <span class="done">Done</span>
            {:else if status === 'WAIT'}
              <span class="waiting">Waiting</span>
            {:else if status === 'RUNNING'}
              <span class="running">Running</span>
            {:else if status === 'TRYCANCEL'}
              <span class="cancelled">Awaiting Cancellation</span>
            {:else if status === 'CANCELLED'}
              <span class="cancelled">Cancelled</span>
            {:else if status === 'ERROR'}<span class="error">Error</span>{/if}
          </p>
          <p class="val">{metrics && metrics.val ? metrics.val.toFixed(5) : ''}</p>
          <div class="empty" />
          {#if $activeModels[id]}
            <div class="container">
              <Container {id} />
            </div>
          {/if}
        </section>
      {/each}
    </main>
  {/key}
{/if}

<style>
  main {
    padding-bottom: 40px;
    padding-top: 50px;
    margin-top: 0;
  }
  header,
  section {
    display: grid;
    grid-template-columns: repeat(10, 1fr);
    grid-gap: 4px;
    background-color: #fff;
  }
  header {
    grid-auto-rows: minmax(36px, auto);
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    margin: 0 0;
    padding: 5px 0;
    background: #eeeeee;
    position: fixed;
    width: 99%;
    z-index: 200;
  }
  section {
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    padding: 10px 0 0;
  }
  section:hover {
    background-color: #fbfbfd;
  }
  section:hover h3.name {
    color: var(--lobster);
  }
  section.active {
    background-color: rgb(250, 248, 220);
  }
  section.active .container,
  section:hover.active .container {
    background-color: #ffffff;
  }
  section.active h3.name {
    color: rgba(var(--reddish-rgb), 0.96);
  }

  .info {
    grid-column: 1 / 7;
    padding-left: 10px;
    cursor: pointer;
    align-self: center;
  }
  header .info {
    cursor: default;
  }
  .request {
    grid-column: 7/ 8;
    margin: auto;
  }
  .status {
    grid-column: 8/ 9;
    margin: auto;
  }
  .val {
    grid-column: 9 / 11;
    margin: auto;
  }
  .empty {
    grid-column: 11 / 12;
    margin: auto;
    width: 50px;
  }
  .container {
    grid-column: 1 / 12;
    padding: 10px 5px 50px;
    min-height: 300px;
    width: 100%;
    overflow-x: scroll;
  }
  .val,
  .status {
    text-align: center;
  }
  p {
    margin: 0;
    padding-bottom: 10px;
    color: var(--text-light);
  }
  h4 {
    margin: auto 0;
    color: var(--text-medium);
    letter-spacing: 0.04em;
    position: relative;
    top: 0px;
  }
  .status span {
    font-family: Inter;
    font-size: 0.95em;
    letter-spacing: 0.04em;
    padding: 0;
    width: 92px;
    display: inline-block;
    border-radius: 2px;
    border: none;
  }

  .done {
    color: var(--green);
    font-size: 12px;
    top: 2px;
    position: relative;
  }
  .cancelled {
    color: var(--magenta);
    font-size: 15px;
    top: 0px;
    position: relative;
  }
  .waiting {
    color: var(--lobster);
  }
  .running {
    color: var(--pink);
  }
  .error {
    color: var(--reddish);
  }
  .info > h4,
  h4.val,
  h4.status {
    color: var(--text-medium);
  }
  .name {
    position: relative;
  }
  .name > div {
    position: absolute;
    display: inline-block;
    margin-left: 10px;
  }
  .icon {
    width: 0.94em;
    height: 0.94em;
    display: inline;
    font-size: 1.4em;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    vertical-align: text-top;
    fill: rgba(var(--reddish-rgb), 0.7);
  }
  .name::before,
  .info > button > span::before {
    content: '';
    border: solid rgba(var(--lobster-rgb), 0.76);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin-right: 10px;
    transition: all 150ms;
    margin-bottom: 1px;
    transition: all 150ms;
  }
  .name.right::before,
  .info > button.right > span::before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .name.down::before,
  .info > button.down > span::before {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .request-cancel-btn {
    width: 120px;
    height: 30px;
    margin: auto;
    top: -4px;
    position: relative;
    color: rgba(var(--reddish-rgb), 0.95);
  }
  .request-rerun-btn {
    width: 126px;
    height: 30px;
    padding-left: 10px;
    padding-right: 10px;
    margin: auto;
    top: -4px;
    position: relative;
    color: var(--text-lighter);
  }
  .info > h4 {
    display: inline-block;
  }
  .info > button {
    margin-left: 10px;
    border: var(--medium-border);
  }
  button.sort {
    border: var(--medium-border);
  }
  button:hover.sort,
  .info > button:hover {
    border-color: var(--lobster);
  }
</style>
