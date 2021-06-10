<script>
  import { fly } from 'svelte/transition'
  import { quadOut, quadIn } from 'svelte/easing'
  let expand = false
</script>

<div class="detail">
  <div
    class="summary"
    class:right={!expand}
    class:down={expand}
    on:click={() => (expand = !expand)}>
    <slot name="summary">Summary</slot>
  </div>
  {#if expand}
    <div
      class="expand"
      in:fly={{ y: 10, duration: 200, easing: quadIn }}
      out:fly={{ y: -10, duration: 150, easing: quadOut, delay: 50 }}>
      <slot>
        <!-- optional fallback -->
      </slot>
    </div>
  {/if}
</div>

<style>
  .summary {
    cursor: pointer;
    padding: 8px;
  }
  .summary::before {
    content: '';
    border: solid rgba(var(--blue-rgb), 0.7);
    border-width: 0 3px 3px 0;
    display: inline-block;
    padding: 3px;
    margin-right: 10px;
    transition: all 150ms;
    margin-bottom: 1px;
    transition: all 150ms;
  }
  .summary.right::before {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .summary.down::before {
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
  }
  :global(.summary) > :global(*) {
    display: inline-block;
  }
  :global(.expand) :global(p) {
    font-size: 16px;
    font-family: var(--sans-serif);
    color: var(--text-light);
    margin-bottom: 1.2em;
  }
  .detail {
    border: 1px solid rgba(0, 0, 0, 0.1);
    margin-bottom: 5px;
    border-radius: 4px;
    -webkit-transition: all 150ms ease-out;
    -moz-transition: all 150ms ease-out;
    -ms-transition: all 150ms ease-out;
    -o-transition: all 150ms ease-out;
    transition: all 150ms ease-out;
  }
  .detail:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
  .expand {
    padding: 0 12px 0 27px;
  }
</style>
