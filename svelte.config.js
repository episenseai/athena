import adapter from '@sveltejs/adapter-node'

export default {
  kit: {
    adapter: adapter({
      // default options are shown
      out: 'build',
      precompress: false,
      env: {
        host: 'HOST',
        port: 'PORT',
      },
    }),
    // hydrate the <div id="svelte"> element in src/app.html
    target: '#svelte',
  },
}
