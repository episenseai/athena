<script>
  import { POST_DATA, PROJECT } from './store'
  import { get } from 'svelte/store'
  import { snack } from '../base/snack'

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

  // stages of the tabular data processing pipeline
  const stages = [
    { name: 'consume' },
    { name: 'prepare' },
    { name: 'transform' },
    { name: 'build' },
  ]

  const handle_revert = (stage) => async () => {
    if (get(PROJECT).pipe_status === '-1') {
      await snack('error', 'Reset the pipeline error to start working on the pipeline again.')
      return
    }
    const from_stage = get(PROJECT).current_stage
    const to_stage = `${stage.name}:GET`
    const from_idx = seq.indexOf(from_stage)
    const to_idx = seq.indexOf(to_stage)
    if (from_idx < 0 || to_idx < 0) {
      await snack('error', 'Invalid stage name provided from reversal')
    } else if (from_idx === to_idx) {
      await snack('warning', 'Can only revert to a previously completed stage')
    } else if (to_idx > from_idx) {
      await snack('warning', 'Can only revert to a previously completed stage')
    } else {
      await PROJECT.revert(from_stage, to_stage)
    }
  }
</script>

<div>
  {#each stages as stage (stage.name)}
    <span
      class:active-stage={stage.name === $PROJECT.current_stage.split(':')[0]}
      class:previous-stage={seq.indexOf($PROJECT.current_stage) > seq.indexOf(`${stage.name}:GET`)}
      on:click|stopPropagation={handle_revert(stage)}
    >
      {stage.name}
    </span>
  {/each}
</div>

<style>
  div {
    padding: 10px 0 0;
    text-align: center;
    margin-bottom: 0;
  }
  span {
    width: 120px;
    display: inline-block;
    padding: 3px 10px;
    letter-spacing: 0.04em;
    font-size: 12px;
    font-family: Inter;
    color: var(--text-lighter);
    cursor: pointer;
    border: var(--dark-border);
    border-right: none;
    font-weight: 500;
  }
  span.previous-stage {
    color: var(--text-dark);
  }
  span:last-child {
    border: var(--dark-border);
    border-radius: 0 4px 4px 0;
  }
  span:first-child {
    border-radius: 4px 0 0 4px;
  }
  span.active-stage {
    color: var(--text-light);
    background-color: #f0f0f0;
  }
  span::before {
    content: '▶ ';
    position: relative;
    font-size: 12px;
    top: 1px;
    line-height: 0;
    padding: 0 4px 0 4px;
    display: inline-block;
    color: rgba(0, 0, 0, 0.4);
  }
  span.previous-stage::before {
    content: '◀ ';
    position: relative;
    -moz-transform: scaleX(1);
    -o-transform: scaleX(1);
    -webkit-transform: scaleX(1);
    transform: scaleX(1);
    display: inline-block;
    color: rgba(var(--pink-rgb), 1);
  }
  span.active-stage::before {
    content: '■ ';
    color: rgba(var(--green-rgb), 1);
  }
  span:hover {
    background-color: #f0f0f0;
  }
  span:hover.active-stage {
    background-color: #f0f0f0;
  }
  :global(.nextstage-btn) {
    width: 220px;
    text-align: center;
    margin: auto;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    padding: 3px 6px 4px 10px;
    border-radius: 0 0 4px 4px;
    border: var(--dark-border);
    border-top: 0;
  }
  :global(button:hover.nextstage-btn) {
    border-color: var(--dark-border-color);
  }
</style>
