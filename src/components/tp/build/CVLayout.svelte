<script>
  export let holdout = 10 // percentage
  export let folds = 20

  let div
  let width = 400
  let height = 430
  let xOffset = 1
  let barHeight = 32

  $: yOffset = barHeight + 15
  $: barWidth = width - (20 + 30 - 20) // width >= 600 + 20 + 30 ? 600 : width - (20 + 30)
  $: holdoutWidth = (holdout / 100) * barWidth
  $: trainValWidth = barWidth - holdoutWidth
  $: valWidth = trainValWidth / folds <= 0 ? 0 : trainValWidth / folds

  $: offsets = Array.apply(null, Array(folds)).map((_, i) => (folds - i - 1) * valWidth)

  let trainColor = '#D7EFEE'
  let valColor = '#FCE7DD'
  let holdoutColor = '#F6F1E4'
  let strokeColor = 'rgba(33, 135, 153, 0.6)'

  const resize = () => {
    let rect = div.getBoundingClientRect()
    width = rect.width
    height = rect.height
  }

  const yCalc = (i) => {
    if (offsets.length > 7 && i >= offsets.length - 2) return (8 - offsets.length + i) * yOffset + 60
    return i * yOffset + 60
  }
</script>

<svelte:window on:resize={resize} />

<div bind:clientWidth={width} bind:this={div}>
  <svg version="1.1" baseProfile="full" {width} {height} xmlns="http://www.w3.org/2000/svg">
    <g>
      <circle cx="35" cy="25" r="6" fill={trainColor} stroke-width="1" stroke={strokeColor} />
      <text x="45" y="26" dominant-baseline="middle">training</text>
      <circle cx="120" cy="25" r="6" fill={valColor} stroke-width="1" stroke={strokeColor} />
      <text x="130" y="26" dominant-baseline="middle">validation</text>
      <circle cx="215" cy="25" r="6" fill={holdoutColor} stroke-width="1" stroke={strokeColor} />
      <text x="225" y="26" dominant-baseline="middle">holdout</text>
    </g>

    {#each offsets as offset, i (folds + '-' + i)}
      {#if i > 4 && i < offsets.length - 2}
        {#if i === 5}
          <text
            x={barWidth / 2}
            y={yCalc(i) + barHeight / 2}
            text-anchor="middle"
            dominant-baseline="middle"
            fill={strokeColor}>
            ------
          </text>
        {/if}
      {:else}
        <g stroke-width="1" stroke={strokeColor}>
          <rect x={xOffset} y={yCalc(i)} width={offset} height={barHeight} fill={trainColor} />
          <rect x={xOffset + offset} y={yCalc(i)} width={valWidth} height={barHeight} fill={valColor} />
          <rect
            x={xOffset + offset + valWidth}
            y={yCalc(i)}
            width={trainValWidth - offset - valWidth <= 0 ? 0 : trainValWidth - offset - valWidth}
            height={barHeight}
            fill={trainColor} />
          <rect
            x={xOffset + trainValWidth}
            y={yCalc(i)}
            width={holdoutWidth}
            height={barHeight}
            fill={holdoutColor} />
          <text
            x={xOffset + barWidth + 6}
            y={yCalc(i) + barHeight / 2}
            width="24"
            stroke-width="0"
            dominant-baseline="middle">
            {i + 1}
            <tspan y={yCalc(i) + barHeight / 2 - 8}>
              {i === 0 ? 'st' : i === 1 ? 'nd' : i === 2 ? 'rd' : 'th'}
            </tspan>
          </text>
        </g>
      {/if}
    {/each}
  </svg>
</div>

<style>
  text {
    fill: var(--text-medium);
  }
  tspan:first-child {
    font-size: 8px;
  }
</style>
