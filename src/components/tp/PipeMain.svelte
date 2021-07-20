<script>
  import { POST_DATA, PROJECT } from './store'
  // import components corresponding to each stage of processing
  import Consume from './Consume.svelte'
  import Prepare from './Prepare.svelte'
  import Transform from './Transform.svelte'
  import Build from './Build.svelte'
  import { get } from 'svelte/store'
  import { snack } from '../base/store/snack'
  import FinalConfig from './FinalConfig.svelte'
  // stages of the tabular data processing pipeline
  const stages = [
    { component: Consume, name: 'consume' },
    { component: Prepare, name: 'prepare' },
    { component: Transform, name: 'transform' },
    { component: Build, name: 'build' },
  ]

  // currently active stages in the pipeline
  let selected = stages[0]

  // sequence of stages
  const seq = [
    'consume:GET',
    'consume:POST',
    'prepare:GET',
    'prepare:POST',
    'transform:GET',
    'transform:POST',
    'build:GET',
    'build:POST',
    'finalconfig:GET',
  ]

  const handle_revert = (stage) => async () => {
    selected = stage
    const from_stage = get(PROJECT).current_stage
    const to_stage = `${stage.name}:GET`
    const from_idx = seq.indexOf(from_stage)
    const to_idx = seq.indexOf(to_stage)
    console.log('current_stage ', from_stage, from_idx)
    console.log('revert_stage ', to_stage, to_idx)
    if (from_idx < 0 || to_idx < 0) {
      await snack('error', 'invalid stage name provided from reversal')
    } else if (from_idx === to_idx) {
      await snack(
        'warning',
        'Stage reversal request ignored. Trying to revert to the stage you are already on.',
      )
    } else if (to_idx > from_idx) {
      await snack('warning', 'Stage reversal request ignored. Can only revert to a previous stage.')
    } else {
      await PROJECT.revert(from_stage, to_stage)
    }
  }
  async function handleMessage(event) {
    if (event.detail.next_stage !== get(POST_DATA).stage) {
      await snack('warning', `Request aborted. ${event.detail.next_stage} is not the next stage.`)
      return
    }
    const data = { ...event.detail, data: get(POST_DATA) }
    PROJECT.post_pipe(data)
  }
</script>

<svelte:head>
  <title>Tabular Pipeline - episense ai</title>
</svelte:head>

{#if $PROJECT.current_stage === 'finalconfig:GET'}
  <FinalConfig />
{:else}
  <div>
    {#each stages as stage (stage.name)}
      <span
        class:active-stage={stage.name === $PROJECT.current_stage.split(':')[0]}
        class:previous-stage={seq.indexOf($PROJECT.current_stage) >
          seq.indexOf(`${stage.name}:GET`)}
        on:click|stopPropagation={handle_revert(stage)}>
        {stage.name}
      </span>
    {/each}
  </div>
  <svelte:component
    this={stages.find((el) => el.name === $PROJECT.current_stage.split(':')[0]).component}
    on:postdata={handleMessage} />
{/if}

<!-- 

<div>
  {#each stages as stage (stage.name)}
    <span
      class:active-stage={stage.component === selected.component}
      on:click|stopPropagation={handle_stages(stage)}>
      {stage.name}
    </span>
  {/each}
</div>
<svelte:component this={selected.component} on:postdata={handleMessage} />

-->
<style>
  div {
    padding: 0;
    text-align: center;
    margin-bottom: 0;
  }
  span {
    width: 115px;
    display: inline-block;
    padding: 1px 12px;
    letter-spacing: 0.04em;
    font-size: 12px;
    font-family: Inter;
    color: var(--text-lighter);
    cursor: pointer;
    border: var(--dark-border);
    border-right: none;
    font-weight: 500;
    border-color: rgba(var(--lobster-rgb), 0.5);
  }
  span.previous-stage {
    color: var(--text-dark);
  }
  span:last-child {
    border-right: var(--dark-border);
    border-radius: 0 4px 4px 0;
    border-color: rgba(var(--lobster-rgb), 0.5);
  }
  span:first-child {
    border-radius: 4px 0 0 4px;
  }
  span.active-stage {
    color: var(--text-light);
    background-color: rgba(var(--lobster-rgb), 0.2);
  }
  span::before {
    content: '⇒ ';
    position: relative;
    font-size: 15px;
    top: 1px;
    line-height: 0;
    padding: 0 2px 0 4px;
    display: inline-block;
    color: rgba(0, 0, 0, 0.4);
  }
  span.previous-stage::before {
    content: '⇐ ';
    position: relative;
    font-size: 15px;
    top: 1px;
    line-height: 0;
    padding: 0 2px 0 4px;
    -moz-transform: scaleX(1);
    -o-transform: scaleX(1);
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    display: inline-block;
    color: var(--lobster);
  }
  span.active-stage::before {
    content: '⇐ ';
    color: var(--lobster);
  }
  span:hover {
    background-color: rgba(var(--lobster-rgb), 0.12);
  }
  span:hover.active-stage {
    background-color: rgba(var(--lobster-rgb), 0.12);
  }
  :global(.nextstage-btn) {
    width: 190px;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 2px 6px 3px 15px;
    border-radius: 0 0 4px 4px;
    border-color: rgba(var(--lobster-rgb), 0.5);
    border-top: 0;
  }
</style>
