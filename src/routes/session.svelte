<script>
  import * as sapper from '@sapper/app'
  const { page, preloading, session } = sapper.stores()
  let clickable = true
</script>

<h2>Session Example change</h2>

<h4>page</h4>
<code>{JSON.stringify($page, undefined, 2)}</code>

<h4>preloading</h4>
<code>{$preloading}</code>

<h4>session</h4>
<pre>{JSON.stringify($session, undefined, 2)}</pre>
<!-- DEBUG: {@debug $session} -->
<button on:click={() => session.set({ title: 'session changed' })}>click me</button>
<button disabled={!clickable} xyz={!clickable}>can't touch this</button>
