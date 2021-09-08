<script>
  import { onMount } from 'svelte'
  import ModelInfo from './ModelInfo.svelte'
  import Predict from './Predict.svelte'
  import ROCCurve from './ROCCurve.svelte'
  import ModelPerformance from './ModelPerformance.svelte'
  import ConfusionMatrix from './ConfusionMatrix.svelte'
  import MultiConfusionMatrix from './MultiConfusionMatrix.svelte'
  import { activeTabs, modelType, models } from './store.js'
  import { get } from 'svelte/store'
  import { snack } from '../../base/snack'
  import GridResults from './GridResults.svelte'

  export let id

  $: model = $models.find((el) => el.id === id)
  $: name = model.name
  $: modelStatus = model.status
  $: uid = String(id)

  // tabs for the models container pane
  const classificationTabs = [
    { component: ModelInfo, name: 'Description' },
    { component: GridResults, name: 'Hyper-parameters' },
    { component: ConfusionMatrix, name: 'Confusion Matrix' },
    { component: ROCCurve, name: 'AUC | ROC Curve' },
    { component: Predict, name: 'Prediction' },
  ]
  const nClassificationTabs = [
    { component: ModelInfo, name: 'Description' },
    { component: GridResults, name: 'Hyper-parameters' },
    { component: MultiConfusionMatrix, name: 'Confusion Matrix' },
    { component: ROCCurve, name: 'AUC | ROC Curve' },
    { component: Predict, name: 'Prediction' },
  ]
  const regressionTabs = [
    { component: ModelInfo, name: 'Description' },
    { component: GridResults, name: 'Hyper-parameters' },
    { component: ModelPerformance, name: 'Performance' },
    { component: Predict, name: 'Prediction' },
  ]

  /* const unfinishedModelTabs = [{ component: ModelInfo, name: 'MODEL INFO' }] */
  $: tabs =
    //  modelStatus !== 'DONE'
    //    ? unfinishedModelTabs
    $modelType === 'classifier'
      ? classificationTabs
      : $modelType === 'multi_classifier'
      ? nClassificationTabs
      : regressionTabs

  const tabupdate = async (tab) => {
    if (tab.name !== 'MODEL INFO') {
      if (modelStatus === 'WAIT') {
        await snack(
          'warning',
          `Model building has not started yet to view the data in "${tab.name.toLowerCase()}" tab.`,
        )
        return false
      }
      if (modelStatus === 'RUNNING') {
        await snack(
          'warning',
          `Model building is not yet complete to view the data in "${tab.name.toLowerCase()}" tab.`,
        )
        return false
      }
      if (modelStatus === 'ERROR') {
        await snack(
          'warning',
          `Error happened during model building. You can not view the data in "${tab.name.toLowerCase()}" tab.`,
        )
        return false
      }
      if (modelStatus === 'CANCELLED') {
        await snack('warning', `Model build was cancelled. No data.`)
        return false
      }
      if (modelStatus === 'TRYCANCEL') {
        await snack('warning', `Model is scheduled to be cancelled. No data`)
        return false
      }
      if (modelStatus === 'INIT') {
        await snack('warning', `Model never ran. No data`)
        return false
      }
    }
    activeTabs.update((val) => {
      val[uid] = tab.name
      return val
    })
  }

  onMount(() => {
    if (!get(activeTabs)[uid])
      activeTabs.update((val) => {
        val[uid] = tabs[0].name
        return val
      })
  })
</script>

<div class="tabs">
  {#each tabs as tab (tab.name)}
    <span
      class:active-tab={tab.name === $activeTabs[uid]}
      class:notdone={modelStatus !== 'DONE'}
      class="noselect"
      on:click|stopPropagation={async () => await tabupdate(tab)}
    >
      {tab.name}
    </span>
  {/each}
</div>
<svelte:component
  this={$activeTabs[uid]
    ? tabs.find((el) => el.name === $activeTabs[uid]).component
    : tabs[0].component}
  {id}
/>

<style>
  .tabs {
    padding: 0;
    text-align: center;
    margin-bottom: 4px;
  }
  span {
    padding: 5px 22px;
    letter-spacing: 0.04em;
    font-size: 12px;
    font-family: Inter;
    color: var(--text-medium);
    cursor: pointer;
    border: var(--dark-border);
    border-right: none;
    font-weight: 500;
    background-color: #fff;
    border-color: var(--dark-border-color);
  }
  span:first-child {
    border-radius: 3px 0 0 3px;
  }
  span:last-child {
    border-right: var(--dark-border);
    border-radius: 0 3px 3px 0;
    border-color: var(--dark-border-color);
  }
  span:only-child {
    border-radius: 3px;
  }
  span:hover,
  span.active-tab {
    background-color: #eeeeee;
  }
</style>
