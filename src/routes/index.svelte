<script>
  // empty

</script>

<svelte:head>
  <title>Home - episense ai</title>
</svelte:head>

<div class="container">
  <h1 class="welcome">Application suite for data analytics</h1>
  <div class="apps">
    <div class="tabular">
      <h2>tabular</h2>
      <p>Setup pipeline and build models to draw insights from tabular data</p>
      <a href="tabular" class="btn"> Go <span>&rarr;</span> </a>
    </div>
  </div>
</div>

<style>
  .container {
    margin: auto;
    text-align: center;
    max-width: 1000px;
  }
  .welcome {
    padding-top: 50px;
    padding-bottom: 10px;
    max-width: 500px;
    margin: 0 auto 20px;
    border-bottom: var(--light-border);
    font-size: 20px;
  }
  .tabular {
    text-align: left;
    margin: 0px auto 10px;
    max-width: 600px;
    border: var(--light-border);
    padding: 1.5em 1.5em 0.75em;
    border-radius: 5px;
  }
  .tabular h2 {
    color: rgba(var(--lobster-rgb), 1);
    margin-bottom: 10px;
  }
  .tabular h2::before {
    content: '❏';
    color: rgba(var(--pink-rgb), 1);
    position: relative;
    font-size: 40px;
    top: 6px;
    line-height: 0;
    padding-right: 8px;
  }
  .tabular p {
    padding: 10px 0;
    font-size: 15px;
    color: var(--text-light);
  }
  .tabular a {
    padding-top: 2px;
    padding-bottom: 2px;
  }
  .btn {
    min-width: 100px;
  }
  .apps {
    padding-top: 30px;
  }

</style>
