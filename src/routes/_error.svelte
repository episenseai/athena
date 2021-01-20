<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<main class="side-pages">
  <h1><span>HTTP Response</span> {status}</h1>

  <h4>[... Error Message ...]</h4>
  <p>{error.message}</p>

  {#if dev && error.stack}
    <h4>[... Stack Trace ...]</h4>
    <pre>{error.stack}</pre>
  {/if}
</main>

<style>
  h1 {
    color: var(--lobster);
    padding-bottom: 6px;
    margin-bottom: 30px;
    border-bottom: 1px solid var(--light11);
  }
  h1 span {
    color: var(--text-dark);
    font-size: inherit;
  }
  p,
  pre {
    margin: 0.5em auto 1em;
  }
  pre {
    padding: 10px 5px;
    overflow-y: scroll;
  }
  h4 {
    letter-spacing: 0.06em;
  }
</style>
