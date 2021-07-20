<script>
  import { OAUTH2_AUTH_CALLBACK_SERVICE } from '../../api/endpoints'
  import { snack } from '../../components/base/store/snack'
  import { onMount } from 'svelte'
  import { get } from 'svelte/store'
  import { stores } from '@sapper/app'

  const { page } = stores()

  const callback = async () => {
    let code = get(page).query.code
    let state = get(page).query.state
    let scope_query = get(page).query.scope
    if (
      code &&
      Object.prototype.toString.call(code) === '[object String]' &&
      state &&
      Object.prototype.toString.call(state) === '[object String]'
    ) {
      // provider login successfull
      let scope = undefined
      if (scope_query && Object.prototype.toString.call(scope_query) === '[object String]') {
        scope = scope_query
      }

      // call auth backend to verify
      const response = await fetch(OAUTH2_AUTH_CALLBACK_SERVICE(code, state, scope), {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        redirect: 'error',
      }).catch(async (_) => {
        await snack('error', 'Lost internet connectivity or the episense server is not responding.')
        return undefined
      })

      if (response && response.status === 200) {
        token = await response.json()
        await snack('success', 'Authorization successfull')
        return true
      } else if (response && response.status === 401) {
        let error = await response
          .json()
          .then((value) => {
            if (value && value.detail) {
              return value
            } else {
              return { detail: 'Authorization failed' }
            }
          })
          .catch(() => {
            return {
              detail: 'Authorization failed',
            }
          })
        await snack('error', error.detail)
      }
      return false
    } else {
      console.log(window.location.href)
      return false
    }
  }

  let success = false
  let token = {}

  onMount(async () => {
    let success = await callback()
    console.log(success)
  })
</script>

<pre>
  {JSON.stringify(token)}
</pre>
