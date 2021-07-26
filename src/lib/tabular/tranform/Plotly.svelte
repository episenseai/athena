<script>
  import { onMount } from 'svelte'

  let plotlyLoaded
  const fPlot = 'frequency-plot'
  const qPlot = 'quantile-plot'

  export let quantile
  export let bins
  export let name

  const hoverlabel = {
    bgcolor: 'rgba(62, 89, 107, 1)',
    bordercolor: 'rgba(109, 137, 157, 1)',
    font: { color: '#fff' },
  }

  $: fTrace = {
    x: bins.breaks,
    y: bins.counts,
    // hover text for each data point
    // text: [],
    name: '--Frequency Plot--',
    hoverinfo: 'y+x',
    type: 'bar',
    marker: { color: 'rgba(85, 161, 229, 1)' },
    hoverlabel,
  }

  $: qTrace = {
    x: Array.apply(null, Array(20)).map((_, i) => (i + 1) * 5),
    y: quantile,
    // hover text for each data point
    // text: [],
    name: '--Quantile Plot--',
    hoverinfo: 'y+x',
    type: 'bar',
    marker: { color: 'rgba(85, 161, 229, 1)' },
    hoverlabel,
  }

  // https://plot.ly/javascript/reference/#layout
  let fLayout
  let qLayout
  let qPlotNode
  const layout = {
    font: {
      family: 'Inter',
      size: '10',
      color: 'rgba(97, 125, 144, 1)',
    },
    showlegend: false,
    bargap: 0.02,
    height: 380,
    margin: { t: 50, b: 40, l: 60, r: 20, pad: 5 },
  }
  $: if (plotlyLoaded && bins) {
    fLayout = {
      title: {
        text: `frequency distribution of: ( ${name} )`,
        y: 0.91,
      },
      ...layout,
      xaxis: { title: { text: 'bins' } },
      yaxis: { title: { text: 'frequency' }, zerolinecolor: '#84b6eb' },
    }

    qLayout = {
      title: {
        text: `20 quantile of: ( ${name} )`,
        y: 0.91,
      },
      ...layout,
      xaxis: { title: { text: 'n-quantile (n = 5, 10, 15, ... 100)' } },
      yaxis: { title: { text: 'values' }, zerolinecolor: '#84b6eb' },
    }

    // eslint-disable-next-line
    Plotly.newPlot(fPlot, [fTrace], fLayout, {
      scrollZoom: false,
      displaylogo: false,
      responsive: true,
    })
    if (Array.isArray(quantile) && quantile.length) {
      qPlotNode.style.opacity = 1
      // eslint-disable-next-line
      Plotly.newPlot(qPlot, [qTrace], qLayout, {
        scrollZoom: false,
        displaylogo: false,
        responsive: true,
      })
    } else {
      qPlotNode.style.opacity = 0
    }
  }

  onMount(() => {
    const script = document.createElement('script')
    script.src = 'https://cdn.plot.ly/plotly-cartesian-latest.min.js'
    script.async = true
    script.onload = () => (plotlyLoaded = true)
    document.head.appendChild(script)

    return () => {
      script.parentNode.removeChild(script)
    }
  })
</script>

<div class="plots">
  <div id={fPlot} />
  <div bind:this={qPlotNode} id={qPlot} />
</div>

<style>
  .plots {
    display: flex;
    margin-bottom: 10px;
    width: 100%;
    margin-left: auto;
    margin-right: auto;
    overflow: scroll;
  }
  .plots > div {
    width: 50%;
  }
</style>
