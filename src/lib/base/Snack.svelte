<script>
  import { snacklist } from '$lib/base/snack'
  import { fly } from 'svelte/transition'

</script>

<div class="snack-container">
  {#each $snacklist as { uuid, type, msg, timeOutFunc } (uuid)}
    <div
      class="snack-box"
      class:info={type === 'info'}
      class:warning={type === 'warning'}
      class:error={type === 'error'}
      class:success={type === 'success'}
      in:fly={{ x: 200, duration: 300 }}
      out:fly={{ x: 200, duration: 300 }}
    >
      <div class="type-icon">
        <span>
          <svg class="icon" focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            {#if type === 'info'}
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1
                15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            {:else if type === 'warning'}
              <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z" />
            {:else if type === 'error'}
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1
                15h-2v-2h2v2zm0-4h-2V7h2v6z"
              />
            {:else if type === 'success'}
              <path
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10
                14.17l7.59-7.59L19 8l-9 9z"
              />
            {/if}
          </svg>
        </span>
      </div>
      <span class="msg">{msg}</span>
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
    width: 340px;
    padding: 0.5em 1.5em 0.5em 0.5em;
    background: rgba(235, 235, 235, 0.65);
    border: 1px solid rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.12);
    margin-bottom: 14px;
    color: #000;
    line-height: 17px;
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
    color: rgba(0, 0, 0, 1);
    font-size: 14px;
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
    border-color: rgba(0, 0, 0, 0.4);
  }
  .type-icon {
    position: absolute;
    padding: 4px;
    right: 0;
    top: 3px;
  }

  .snack-box.info {
    border-color: rgba(49, 114, 221, 0.4);
  }
  .snack-box.warning {
    border-color: rgba(114, 47, 55, 0.4);
  }
  .info .icon {
    fill: rgb(49, 114, 231);
  }
  .warning .icon {
    fill: rgb(114, 47, 55);
  }
  .info button:hover {
    border: 1px solid rgba(49, 114, 221, 1);
  }

  .snack-box.success {
    border-color: rgba(1, 143, 105, 0.4);
  }
  .success .icon {
    fill: rgb(1, 143, 105);
  }
  .success button:hover {
    border: 1px solid rgba(1, 143, 105, 1);
  }

  .snack-box.error {
    border-color: rgba(188, 64, 64, 0.4);
  }
  .error .icon {
    fill: rgb(188, 64, 64);
  }
  .error button:hover {
    border: 1px solid rgba(188, 64, 64, 1);
  }

</style>
