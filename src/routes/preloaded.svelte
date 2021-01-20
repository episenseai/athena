<script context="module">
  export function preload(page, { title, user }) {
    if (!user) return this.redirect(302, 'session')
    return { title, user }
  }
</script>

<script>
  import * as sapper from '@sapper/app'
  const { page, preloading, session } = sapper.stores()
  export let title
  export let user
</script>

<h2>Preloaded example page</h2>
<p>tile - {title} / user: {JSON.stringify(user)}</p>

<h4>page</h4>
<code>{JSON.stringify($page, undefined, 2)}</code>

<h4>preloading</h4>
<code>{$preloading}</code>

<h4>session</h4>
<pre>{JSON.stringify($session, undefined, 2)}</pre>
<button on:click={() => session.set({ title: 'preloaded changed' })}>click me</button>
