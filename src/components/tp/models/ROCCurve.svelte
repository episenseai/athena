<script>
  import { onMount } from 'svelte'
  import { modelType } from './store.js'
  export let model
  import { v4 as uuidv4 } from 'uuid'

  let plotlyLoaded
  const uuid = 'pl-' + uuidv4()
  let my_node
  const hoverlabel = {
    bgcolor: 'rgba(62, 89, 107, 1)',
    bordercolor: 'rgba(109, 137, 157, 1)',
    font: { color: '#fff' },
  }
  $: trace0 = {
    x: [0, 1],
    y: [0, 1],
    mode: 'lines',
    type: 'scatter',
    line: { shape: 'linear', dash: 'dot', width: 1 },
    hoverinfo: 'y+x',
    hoverlabel,
    //marker: { color: 'rgba(0, 125, 184, 0.85)' },
    name: `x = y`,
  }
  $: traceTemplate = {
    //x: model.roc.x,
    //y: model.roc.y,
    mode: 'lines+markers',
    //name: `ROC (area = ${model.roc.area})`,
    type: 'scatter',
    hoverinfo: 'y+x',
    hoverlabel,
    line: { shape: 'linear', dash: 'solid', width: 1 },
  }
  const layout = {
    font: {
      family: 'Inter',
      size: '10',
      color: 'rgba(97, 125, 144, 1)',
    },
    showlegend: true,
    width: 900,
    height: 500,
    margin: { t: 70, b: 40, l: 60, r: 20, pad: 5 },
    title: 'Receiver operating characteristic Curve - Binary Classifier',
    xaxis: { title: { text: 'false positive rate' } },
    yaxis: { title: { text: 'true positive rate' } },
  }
  $: if (my_node) {
    let traces = [trace0]
    // if ($modelType === 'classifier') {
    //   traces.push({
    //     ...traceTemplate,
    //     x: model.roc.x,
    //     y: model.roc.y,
    //     name: `ROC (area = ${model.roc.area})`,
    //   })
    // } else {
    //   model.roc.forEach(({ x, y, name, area }) => {
    //     traces.push({ ...traceTemplate, x, y, name: `${name} (area = ${area})` })
    //   })
    // }
    model.roc.forEach(({ x, y, name, area }) => {
      traces.push({ ...traceTemplate, x, y, name: `${name} (area = ${area})` })
    })
    Plotly.newPlot(uuid, traces, layout, {
      scrollZoom: false,
      displaylogo: false,
      responsive: true,
    })
  }
  // onMount(() => {
  //   const script = document.createElement('script')
  //   script.src = 'https://cdn.plot.ly/plotly-cartesian-latest.min.js'
  //   script.async = true
  //   script.onload = () => (plotlyLoaded = true)
  //   document.head.appendChild(script)
  //
  //   return () => {
  //     script.parentNode.removeChild(script)
  //   }
  // })
</script>

<div class="plots">
  <div bind:this={my_node} id={uuid} class="rocplot" />
</div>

<style>
  .rocplot {
    width: 850px;
    margin: 30px auto 0;
  }
</style>
