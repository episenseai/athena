<script>
  import { createEventDispatcher } from 'svelte'

  const dispatch = createEventDispatcher()
</script>

<div class="modal-background" on:click={() => dispatch('close')} />

<div class="modal">
  <slot name="header" />
  <hr />
  <slot />
  <hr />
  <button on:click={() => dispatch('close')}>&larr; Go Back</button>
</div>

<style>
  .modal-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(239, 239, 238, 0.92);
  }

  .modal {
    position: fixed;
    left: 50%;
    top: 50%;
    max-width: calc(100% - 2em);
    max-height: calc(100% - 2em);
    overflow: auto;
    transform: translate(-50%, -50%);
    padding: 1em;
    background: white;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  button {
    display: block;
  }
  hr {
    margin-top: 10px;
    margin-bottom: 10px;
  }
</style>
