<script>
  import { snacklist } from '$lib/base/snack'
  import { slide } from 'svelte/transition'
</script>

<div class="snack-container">
  {#each $snacklist as { uuid, type, msg, timeOutFunc } (uuid)}
    <div
      class="snack-box"
      class:info={type === 'info'}
      class:warning={type === 'warning' || type === 'warn'}
      class:error={type === 'error'}
      class:success={type === 'success'}
      class:quota={type === 'quota'}
      transition:slide|local
    >
      <span class="type">
        {#if type === 'info'}
          <span>INFO:</span>
        {:else if type === 'warning' || type === 'warn'}
          <span>WARN</span>
        {:else if type === 'error'}
          <span>ERROR</span>
        {:else if type === 'success'}
          <span>OK</span>
        {:else if type === 'quota'}
          <span>QUOTA</span>
        {/if}
      </span>
      <span class="msg">: {msg}</span>
      <button on:click={() => timeOutFunc()}>
        <span>
          <svg class="icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path
              d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59
              13.41 12z"
            />
          </svg>
        </span>
      </button>
    </div>
  {/each}
</div>

<style>
  .snack-container {
    background: transparent;
    position: fixed;
    top: 48px;
    right: 4px;
    z-index: 2000;
  }
  .snack-box {
    position: relative;
    width: 250px;
    padding: 10px 5px;
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
    margin-bottom: 15px;
    color: #000;
    line-height: 17px;
    background-color: rgba(235, 235, 235, 0.6);
  }
  .icon {
    width: 0.94em;
    height: 0.94em;
    display: inline;
    font-size: 1.3em;
    transition: fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    user-select: none;
    vertical-align: text-top;
  }
  .msg {
    color: rgba(0, 0, 0, 0.75);
    font-size: 13px;
    font-weight: 500;
    line-height: 18px;
  }
  button {
    border: 1px solid rgba(0, 0, 0, 0.5);
    padding: 0 2px;
    position: absolute;
    left: -10px;
    top: -10px;
    margin: 0;
    height: 22px;
    background: #ffffff;
    border-radius: 50%;
  }
  button:hover {
    border: 1px solid rgba(0, 0, 0, 0.85);
    background-color: #eeeeee;
  }
  .type {
    font-size: 12px;
    font-weight: 500;
  }
  .info .type {
    color: blue;
  }
  .warning .type {
    color: brown;
  }
  .success .type {
    color: green;
  }
  .error .type {
    color: red;
  }
  .quota .type {
    color: magenta;
  }
</style>
