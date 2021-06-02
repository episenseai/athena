<script>
  import Container from './models/Container.svelte'
  import { models, modelType, activeModels, optimizeUsing } from './models/store.js'
  import { get } from 'svelte/store'
  import { GET_DATA } from './store.js'
  import Spinner from '../Spinner.svelte'
  import Jumper from '../Jumper.svelte'
  import { PROJECT } from '../../components/tp/store'

  // for development purpose only
  //onMount(() => ($activeModel = $models[0].id))
  async function cancel_model(id) {
    await PROJECT.cancel_model(id)
    let i = get(models).findIndex((el) => el.id === id)
    if (i !== -1) {
      let m = get(models)[i]
      if (m.status === 'WAIT' || m.status === 'RUNNING' || m.status === 'TRYCANCEL') {
        console.log(m.status)
        await PROJECT.get_model_by_id(id)
      }
    }
  }
  async function rerun_model(id) {
    let modelids = [id]
    let changed_hparams = {}
    changed_hparams[id] = changed_hyperparameters(id)
    let res = await PROJECT.model_build(modelids, changed_hparams)
    if (res) {
      models.update((ms) => {
        const new_ms = ms.map((m) => {
          if (m.id === id) {
            // console.log('changed to running')
            m.status = 'RUNNING'
          }
          return m
        })
        return ms
      })
      // console.log(get(models))
      await PROJECT.sse_models_update(true)
    }
  }

  function getRandomIntInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1) + min) //The maximum is inclusive and the minimum is inclusive
  }
  function getRandomFloatInclusive(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.random() * (max - min) + min //The maximum is inclusive and the minimum is inclusive
  }
  function changed_hyperparameters(id) {
    if (id === '6bb167c7-fd88-4fc1-8cc9-5005b463a6b4') {
      return decisiontreeclf_hyperparams()
    } else if (id === '24ee24ed-6174-4a79-bf53-215d6fbcf680') {
      return adaboostclf_hyperparams()
    }
  }

  function decisiontreeclf_hyperparams() {
    // console.log(JSON.stringify(get(GET_DATA)))
    return {
      criterion: ['gini', 'entropy'],
      splitter: ['best', 'random'],
      max_features: [
        getRandomIntInclusive(5, get(GET_DATA).data.includedFeatures),
        getRandomIntInclusive(5, get(GET_DATA).data.includedFeatures),
      ],
      max_leaf_nodes: [
        getRandomIntInclusive(5, get(GET_DATA).data.includedFeatures),
        getRandomIntInclusive(5, get(GET_DATA).data.includedFeatures),
      ],
    }
  }
  function adaboostclf_hyperparams() {
    // console.log(JSON.stringify(get(GET_DATA)))
    return {
      n_estimators: [50, getRandomIntInclusive(0, 50), getRandomIntInclusive(50, 100)],
      learning_rate: [1, getRandomFloatInclusive(0, 1), getRandomFloatInclusive(1, 3)],
    }
  }

</script>

{#if $PROJECT.current_stage && $modelType && $models && $models.length > 0}
  <main>
    <header>
      <h4 class="info noselect">
        {$modelType === 'regressor'
          ? 'Regressor Models'
          : $modelType === 'classifier'
          ? 'Classifier Models'
          : 'Multi Classifier Models'}
      </h4>
      <h4 class="request noselect">Request</h4>
      <h4 class="status noselect">Status</h4>
      <h4 class="val noselect">{$optimizeUsing} (metric)</h4>
      <div class="empty" />
    </header>
    {#each $models as { name, desc, id, metrics, status, classes } (id)}
      <section class:active={$activeModels[id]}>
        <div
          class="info"
          title={$activeModels[id] ? 'Click to hide the details' : 'Click to show the details of:  ' + name}
          on:click|preventDefault|stopPropagation={() => {
            let val = true
            if (get(activeModels)[id]) {
              val = false
            }
            activeModels.update((m_ids) => {
              m_ids[id] = val
              return m_ids
            })
          }}>
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
                    15h-2v-2h2v2zm0-4h-2V7h2v6z" />
                </svg>
              {/if}
            </div>
          </h3>
          <p>{desc}</p>
        </div>
        {#if status === 'DONE' || status === 'ERROR' || status === 'CANCELLED'}
          <button class="request request-rerun-btn" on:click|stopPropagation={rerun_model(id)}>Rerun</button>
        {:else}
          <button class="request request-cancel-btn" on:click|stopPropagation={cancel_model(id)}>Cancel</button>
        {/if}
        <p class="status noselect">
          {#if status === 'DONE'}
            <span class="done">Done</span>
          {:else if status === 'WAIT'}
            <span class="waiting">Waiting</span>
          {:else if status === 'RUNNING'}
            <span class="running">Running</span>
          {:else if status === 'TRYCANCEL'}
            <span class="cancelled">Await Cancellation</span>
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
{/if}

<style>
  main {
    padding-bottom: 40px;
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
    padding-bottom: 0;
    background: rgb(255, 248, 220);
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
    background-color: #fffff0;
  }
  section.active .container,
  section:hover.active .container {
    background-color: #fffff0;
  }
  section.active h3.name {
    color: rgba(var(--reddish-rgb), 0.96);
  }
  .info {
    grid-column: 1 / 8;
    padding-left: 10px;
    cursor: pointer;
  }
  header .info {
    cursor: default;
  }
  .request {
    grid-column: 8/ 9;
    margin: auto;
  }
  .status {
    grid-column: 9/ 10;
    margin: auto;
  }
  .val {
    grid-column: 10 / 11;
    margin: auto;
  }
  .empty {
    grid-column: 11 / 12;
    margin: auto;
    width: 50px;
  }
  .container {
    grid-column: 1 / 12;
    padding: 10px 10px 50px;
    min-height: 300px;
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
  h4.info,
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
  .name::before {
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
  .name.right::before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .name.down::before {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }

  .request-cancel-btn {
    width: 80px;
    height: 30px;
    margin: auto;
    top: -4px;
    position: relative;
    color: rgba(var(--reddish-rgb), 0.95);
  }
  .request-rerun-btn {
    width: 80px;
    height: 30px;
    margin: auto;
    top: -4px;
    position: relative;
    color: rgba(var(--blue-rgb), 0.95);
  }

</style>
