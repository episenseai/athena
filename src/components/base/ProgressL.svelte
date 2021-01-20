<script>
  import { tweened } from 'svelte/motion'
  import { cubicOut } from 'svelte/easing'

  const _progress = tweened(0, {
    duration: 400,
    easing: cubicOut,
  })
  export let progress = 0
  $: _progress.set(progress)
</script>

<div class="pg">
  <div class="line">
    <div class="subline" class:inc={!$_progress} style={$_progress ? `width: ${$_progress}%` : ''} />
    <div class:subline={!$_progress} class:dec={!$_progress} />
  </div>
</div>

<style>
  .pg {
    position: relative;
    width: 100%;
    height: 3px;
    overflow-x: hidden;
    background: rgba(232, 62, 140, 0.3);
  }
  .line {
    position: absolute;
    width: 100%;
  }
  .subline {
    position: absolute;
    background: rgb(232, 62, 140);
    height: 3px;
  }
  .inc {
    animation: increase 2s ease-in-out infinite;
  }
  .dec {
    animation: decrease 2s 0.9s ease-in-out infinite;
  }
  @keyframes increase {
    from {
      left: -5%;
      width: 5%;
    }
    to {
      left: 130%;
      width: 150%;
    }
  }
  @keyframes decrease {
    from {
      left: -90%;
      width: 90%;
    }
    to {
      left: 110%;
      width: 10%;
    }
  }
</style>
