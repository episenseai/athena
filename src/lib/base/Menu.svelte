<script>
  import { snack } from '$lib/base/snack'
  import { fly } from 'svelte/transition'
  import { quadOut, quadIn } from 'svelte/easing'
  export let items = []
  export let open = false
  export let selected = null
  export let width
  export let color // maroon, violet, green, pink, blue, teal, purple
  $: selectedName = selected ? items[items.findIndex((el) => el.value === selected)].name : ''

</script>

<svelte:window on:click={() => (open = false)} />
<div
  class="menu"
  style="width: {width}px;"
  class:maroon={color === 'maroon'}
  class:violet={color === 'violet'}
  class:green={color === 'green'}
  class:pink={color === 'pink'}
  class:purple={color === 'purple'}
  class:blue={color === 'blue'}
  class:teal={color === 'teal'}
  on:click|stopPropagation={async () => {
    if (items.length === 0) await snack('warning', 'The list is empty...')
  }}
>
  {#if color === 'maroon'}
    <button on:click={() => (open = !open)} btn-maroon>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else if color === 'violet'}
    <button on:click={() => (open = !open)} btn-violet>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else if color === 'green'}
    <button on:click={() => (open = !open)} btn-green>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else if color === 'pink'}
    <button on:click={() => (open = !open)} btn-pink>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else if color === 'purple'}
    <button on:click={() => (open = !open)} btn-purple>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else if color === 'blue'}
    <button on:click={() => (open = !open)} btn-blue>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else if color === 'teal'}
    <button on:click={() => (open = !open)} btn-teal>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {:else}
    <button on:click={() => (open = !open)}>
      <span class="txt">{selectedName ? selectedName : 'Select'}</span>
    </button>
  {/if}
  {#if open}
    <div
      class="items"
      in:fly={{ y: 10, duration: 200, easing: quadIn }}
      out:fly={{ y: -10, duration: 100, easing: quadOut, delay: 50 }}
    >
      {#each items as item (item.value)}
        <div
          class="item"
          class:highlight={selected === item.value}
          on:click={() => {
            selected = item.value
            open = false
          }}
        >
          <div class="name">
            {@html item.name}
          </div>
          {#if item.desc}
            <div class="desc">{item.desc}</div>
          {/if}
        </div>
      {/each}
    </div>
  {/if}
</div>

<style>
  .menu {
    display: inline-block;
    position: relative;
  }
  .items {
    cursor: pointer;
    position: absolute;
    left: 0;
    top: 28px;
    background-color: #fff;
    border-radius: 2px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    width: 100%;
    z-index: 10;
    margin-top: 2px;
    max-height: 500px;
    overflow: scroll;
  }
  .item {
    padding: 0.25em 1em 0.25em;
    background-color: rgba(0, 0, 0, 0.04);
    border-bottom: 1px solid rgba(198, 203, 209, 0.3);
  }
  .item:last-child {
    border-bottom: none;
  }
  .item:hover {
    background-color: rgba(0, 0, 0, 0.12);
  }
  .name {
    font-size: 14px;
    padding-bottom: 4px;
    letter-spacing: 0.014em;
  }
  .desc {
    color: var(--text-lighter);
    font-size: 13px;
    padding-bottom: 4px;
  }
  button {
    display: block;
    width: 100%;
    text-align: left;
    padding: 4px 20px 5px 12px;
    height: auto;
    border: 1px solid rgba(0, 0, 0, 0.3);
  }
  span.txt::after {
    content: '';
    width: 0;
    height: 0;
    position: absolute;
    pointer-events: none;
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 8px solid rgba(var(--btn-default-rgb), 0.7);
    top: 12px;
    right: 6px;
  }

  .desc {
    font-weight: 500;
    color: #666666;
  }
  .maroon span.txt::after {
    border-top-color: rgba(var(--pink-rgb), 0.7);
  }
  .maroon button:hover span.txt::after {
    border-top-color: rgba(var(--pink-rgb), 0.84);
  }
  .maroon .item {
    background-color: rgba(var(--pink-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--pink-rgb), 0.14);
  }
  .maroon .item:hover,
  .maroon .item.highlight {
    background-color: rgba(var(--btn-maroon-rgb), 0.07);
  }
  .maroon .name {
    color: rgba(var(--pink-rgb), 1);
  }

  .violet span.txt::after {
    border-top-color: rgba(var(--btn-violet-rgb), 0.7);
  }
  .violet button:hover span.txt::after {
    border-top-color: rgba(var(--btn-violet-rgb), 0.84);
  }
  .violet .item {
    background-color: rgba(var(--btn-violet-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--btn-violet-rgb), 0.14);
  }
  .violet .item:hover,
  .violet .item.highlight {
    background-color: rgba(var(--btn-violet-rgb), 0.07);
  }
  .violet .name {
    color: rgba(var(--btn-violet-rgb), 0.9);
  }

  .green span.txt::after {
    border-top-color: rgba(var(--btn-green-rgb), 0.7);
  }
  .green button:hover span.txt::after {
    border-top-color: rgba(var(--btn-green-rgb), 0.84);
  }
  .green .item {
    background-color: rgba(var(--btn-green-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--btn-green-rgb), 0.14);
  }
  .green .item:hover,
  .green .item.highlight {
    background-color: rgba(var(--btn-green-rgb), 0.07);
  }
  .green .name {
    color: rgba(var(--btn-green-rgb), 0.9);
  }
  .pink span.txt::after {
    border-top-color: rgba(var(--btn-pink-rgb), 0.7);
  }
  .pink button:hover span.txt::after {
    border-top-color: rgba(var(--btn-pink-rgb), 0.84);
  }
  .pink .item {
    background-color: rgba(var(--btn-pink-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--btn-pink-rgb), 0.14);
  }
  .pink .item:hover,
  .pink .item.highlight {
    background-color: rgba(var(--btn-pink-rgb), 0.07);
  }
  .pink .name {
    color: rgba(var(--btn-pink-rgb), 0.9);
  }
  .blue span.txt::after {
    border-top-color: rgba(var(--btn-blue-rgb), 0.7);
  }
  .blue button:hover span.txt::after {
    border-top-color: rgba(var(--btn-blue-rgb), 0.84);
  }
  .blue .item {
    background-color: rgba(var(--btn-blue-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--btn-blue-rgb), 0.14);
  }
  .blue .item:hover,
  .blue .item.highlight {
    background-color: rgba(var(--btn-blue-rgb), 0.07);
  }
  .blue .name {
    color: rgba(var(--btn-blue-rgb), 0.9);
  }

  .teal span.txt::after {
    border-top-color: rgba(var(--btn-teal-rgb), 0.7);
  }
  .teal button:hover span.txt::after {
    border-top-color: rgba(var(--btn-teal-rgb), 0.84);
  }
  .teal .item {
    background-color: rgba(var(--btn-teal-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--btn-teal-rgb), 0.14);
  }
  .teal .item:hover,
  .teal .item.highlight {
    background-color: rgba(var(--btn-teal-rgb), 0.07);
  }
  .teal .name {
    color: rgba(var(--btn-teal-rgb), 0.9);
  }

  .purple span.txt::after {
    border-top-color: rgba(var(--btn-purple-rgb), 0.7);
  }
  .purple button:hover span.txt::after {
    border-top-color: rgba(var(--btn-purple-rgb), 0.84);
  }
  .purple .item {
    background-color: rgba(var(--btn-purple-rgb), 0.03);
    border-bottom: 1px solid rgba(var(--btn-purple-rgb), 0.14);
  }
  .purple .item:hover,
  .purple .item.highlight {
    background-color: rgba(var(--btn-purple-rgb), 0.07);
  }
  .purple .name {
    color: rgba(var(--btn-purple-rgb), 0.9);
  }

</style>
