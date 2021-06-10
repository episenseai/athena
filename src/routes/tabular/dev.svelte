<script>
  import { fetch_json_GET } from '../../api/fetch'
  import { GET_SSE_TOKEN_SERVICE, SSE_MODELS_UPDATE_SERVICE } from '../../api/endpoints'
  import { LOGIN } from '../../components/auth/store.js'
  import { SSE } from '../../api/sse'
  import { get } from 'svelte/store'
  import { PROJECT } from '../../components/tp/store'

  /* eslint-disable */
  async function test_sse() {
    try {
      const token = await get_token()
      if (!token) {
        console.log('Could not get SSE token')
        return false
      }
      console.log(token)
      const es = new EventSource(
        SSE_MODELS_UPDATE_SERVICE(get(LOGIN).userid, get(PROJECT).id, token),
        {
          withCredentials: true,
        }
      )
      es.addEventListener(
        'message',
        (e) => {
          // base64 decode
          const decoded = window.atob(e.data)
          // json parse the string after decoding
          const pipe_state = JSON.parse(decoded)
          $SSE = decoded
          for (let [key, value] of Object.entries(pipe_state.data)) {
            console.log(`${key}: ${value}`)
          }
          //if (pipe_state.id !== get(PROJECT).id) {
          //  es.close()
          //  return
          //}

          //console.log('1', pipe_state)
          //console.log('2', get(PROJECT))

          //  if (
          //    get(PROJECT).pipe_status !== get(PROJECT).pipe_status ||
          //    get(PROJECT).current_stage !== get(PROJECT).current_stage
          //  ) {
          //    console.log()
          //  }
        },
        false
      )
    } catch (e) {
      console.log('event source exception: ', e)
    }
  }

  async function get_token() {
    const response = await fetch_json_GET(
      GET_SSE_TOKEN_SERVICE(get(LOGIN).userid, get(PROJECT).id),
      'GET SSE TOKEN'
    )
    if (!response) return false
    if (response.json.success) {
      return response.json.data.token
    }
    return false
  }
</script>

<svelte:head>
  <title>dev page</title>
</svelte:head>
<div class="container">
  <pre>{$SSE}</pre>
  <button on:click={async () => await PROJECT.sse_models_update()}>Get SSE</button>
</div>

<style>
  .container {
    width: 700px;
    margin: auto;
    padding-top: 30px;
  }
</style>
