<script>
  // empty
</script>

<svelte:head>
  <title>Home - episense ai</title>
</svelte:head>

<div class="container">
  <h1 class="welcome">Welcome to episense ai data inteligence app</h1>
  <p>Your Data has a Story. We help you Shape it.</p>
  <p>
    Your data doesn’t belong in a silo. We help you craft custom Data Analytics Workflow that is uniquely suited for the
    scale and scope of your organisation, so that you can be more informed while making your day to day decisions.
  </p>
  <div class="tabular">
    <h2>tabular</h2>
    <p>Setup pipeline and build models to derive insight from the data in tabular form.</p>
    <a href="tabular" class="btn"> Go <span class="logo-global">→</span> </a>
  </div>
</div>

<style>
  .container {
    margin: auto;
    text-align: center;
    max-width: 1000px;
  }
  .welcome {
    padding-top: 20px;
    padding-bottom: 15px;
    max-width: 600px;
    margin: 0 auto 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.4);
  }
  .tabular {
    text-align: left;
    margin: 30px auto 10px;
    max-width: 400px;
    border: 1px solid rgba(var(--blue-rgb), 0.3);
    padding: 1.5em 1.5em 0.75em;
    border-radius: 5px;
  }
  .tabular h2 {
    color: var(--blue);
    margin-bottom: 10px;
  }
  .tabular h2::before {
    content: '❏';
    position: relative;
    font-size: 40px;
    top: 6px;
    line-height: 0;
    padding-right: 8px;
    color: #111;
  }
  .tabular p {
    margin-bottom: 10px;
  }
  .tabular a {
    padding-top: 2px;
    padding-bottom: 2px;
  }
</style>
