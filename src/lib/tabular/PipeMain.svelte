<script>
  import { POST_DATA, PROJECT } from './store'
  import Consume from './Consume.svelte'
  import Prepare from './Prepare.svelte'
  import Transform from './Transform.svelte'
  import Build from './Build.svelte'
  import { get } from 'svelte/store'
  import { snack } from '../base/snack'
  import FinalConfig from './FinalConfig.svelte'
  import StagesNav from './StagesNav.svelte'

  // stages of the tabular pipeline
  const stages = [
    { component: Consume, name: 'consume' },
    { component: Prepare, name: 'prepare' },
    { component: Transform, name: 'transform' },
    { component: Build, name: 'build' },
  ]

  async function handleMessage(event) {
    if (event.detail.next_stage !== get(POST_DATA).stage) {
      await snack('warning', `Request aborted. ${event.detail.next_stage} is not the next stage.`)
      return
    }
    const data = { ...event.detail, data: get(POST_DATA) }
    await PROJECT.post_pipe(data)
  }
</script>

<svelte:head>
  <title>Tabular Pipeline - episense ai</title>
</svelte:head>

{#if $PROJECT.current_stage === 'finalconfig:GET'}
  <FinalConfig />
{:else}
  <StagesNav />
  <svelte:component
    this={stages.find((el) => el.name === $PROJECT.current_stage.split(':')[0]).component}
    on:postdata={handleMessage}
  />
{/if}
