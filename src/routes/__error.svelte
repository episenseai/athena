<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === 'development'
</script>

<svelte:head>
  <title>{status}</title>
</svelte:head>

<main class="side-pages">
  <h4>[ERROR]: {status} {error.message}</h4>
  <a class="btn" href="/">Go to home page</a>
</main>

<style>
  h4 {
    letter-spacing: 0.02em;
    text-align: center;
    font-size: 20px;
    margin-top: 50px;
    color: rgba(0, 0, 0, 0.7);
    font-weight: 700;
  }
  .side-pages a {
    display: block;
    text-align: center;
    width: 320px;
    margin: auto;
    margin-top: 20px;
    color: rgba(var(--lobster-rgb), 1);
    border-color: rgba(var(--lobster-rgb), 1);
  }
</style>
