<script>
  import { v4 as uuidv4 } from 'uuid'

  const uuid = 'pl-' + uuidv4()
  let my_node

  export let model
  $: metrics = model.metrics

  const hoverlabel = {
    bgcolor: 'rgba(62, 89, 107, 1)',
    bordercolor: 'rgba(109, 137, 157, 1)',
    font: { color: '#fff' },
  }
  $: trace0 = {
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
    mode: 'markers',
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
    width: 750,
    height: 500,
    margin: { t: 70, b: 40, l: 60, r: 20, pad: 5 },
    title: 'True vs Predicted value',
    xaxis: { title: { text: 'True Value' } },
    yaxis: { title: { text: 'Predicted Value' } },
  }
  $: if (my_node && model) {
    const traces = []
    const min = Math.min(...model.pt.t)
    const max = Math.max(...model.pt.t)
    traces.push({
      ...trace0,
      x: [min, max],
      y: [min, max],
      name: 'x = y (true value)',
    })
    traces.push({
      ...traceTemplate,
      x: model.pt.t,
      y: model.pt.p,
      name: 'predicted values',
    })
    // eslint-disable-next-line
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

<table>
  <thead>
    <tr>
      <th colspan="2">SIGNIFICANT MODEL MTERICS (REGRESSION)</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>R-Squared</td>
      <td>{metrics.r2}</td>
    </tr>
    <tr>
      <td>Root Mean Squared Error</td>
      <td>{metrics.rmse}</td>
    </tr>
    <tr>
      <td>Mean Absolute Error</td>
      <td>{metrics.mae}</td>
    </tr>
    <tr>
      <td>Mean squared Log error</td>
      <td>{metrics.msle}</td>
    </tr>
  </tbody>
</table>

<div class="plots">
  <div bind:this={my_node} id={uuid} class="rocplot" />
</div>

<style>
  table {
    width: 400px;
    margin: 30px auto 15px;
  }
  .rocplot {
    width: 750px;
    margin: auto;
  }
</style>
