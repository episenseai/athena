import { LOGIN } from '$lib/auth/store'
import { snack } from '$lib/base/snack'
import { BACKEND } from './endpoints'
import { get } from 'svelte/store'

function get_auth_header() {
  const login_store = get(LOGIN)
  if (login_store.success && login_store.access_token) {
    return { Authorization: `Bearer ${login_store.access_token}` }
  }
  return {}
}

const cors = () => {
  if (new URL(BACKEND).origin === window.location.origin) return 'same-origin'
  else return 'cors'
}

export async function fetch_json_POST(url, data, service_name) {
  // POST request to the service
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...get_auth_header(),
      },
      body: JSON.stringify(data),
      // cross origin request headers
      mode: cors(),
      // never cache request or response
      cache: 'no-store',
    }).catch(async (_) => {
      await snack('error', 'An error occured')
      return false
    })

    if (!response || !response.status) return false

    // parse json reponse
    const json = await response.json()

    // good response
    if (response.status === 200 || response.status === 201) return { json }

    if (json.quota_error) {
      await snack('quota', json.info ? json.info : 'Request error')
      return false
    }

    // malformed request
    if (response.status === 400) {
      await snack('error', json.info ? json.info : `${response.status}: 'Request error'`)
      return false
    }

    // unauthorized request
    if (response.status === 401) {
      if (await LOGIN.cred_expired(response.headers)) {
        await LOGIN.oauth_relogin()
      } else {
        await snack('error', json.info ? json.info : `${response.status}: Unauthorized request.`)
      }
      return false
    }

    if (response.status === 500) {
      await snack('error', 'An error occured')
      return false
    }
  } catch (e) {
    console.log(e)
    await snack('error', `something fatal happened during ${service_name} Serivce request`)
    return false
  }
}

export async function fetch_json_GET(url, service_name) {
  // POST request to the service
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...get_auth_header(),
      },
      // cross origin request headers
      mode: cors(),
      // never cache request or response
      cache: 'no-store',
    }).catch(async (_) => {
      await snack('error', 'An error occured')
      return false
    })

    if (!response || !response.status) return false

    // parse json reponse
    const json = await response.json()

    // good response
    if (response.status === 200 || response.status === 201) return { json }

    if (json.quota_error) {
      await snack('error', 'Request error')
      return false
    }

    // malformed request
    if (response.status === 400) {
      await snack('error', json.info ? json.info : `${response.status}: 'Request error'`)
      return false
    }

    // unauthorized request
    if (response.status === 401) {
      if (await LOGIN.cred_expired(response.headers)) {
        await LOGIN.oauth_relogin()
      } else {
        await snack('error', json.info ? json.info : `${response.status}: Unauthorized request.`)
      }
      return false
    }

    if (response.status === 500) {
      await snack('error', 'An error occured')
      return false
    }
  } catch (e) {
    console.log(e)
    await snack('error', `something fatal happened during ${service_name} Serivce request`)
    return false
  }
}

export async function fetch_upload_POST(url, formData) {
  const filename = formData.get('filename')
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        ...get_auth_header(),
      },
      body: formData,
      // cross origin request headers
      mode: cors(),
      // never cache request or response
      cache: 'no-store',
    }).catch(async (_) => {
      await snack('error', 'An error occured')
      return false
    })

    if (!response || !response.status) return false

    // parse json reponse
    const json = await response.json()

    // good response
    if (response.status === 200 || response.status === 201) return { json }

    // malformed request
    if (response.status === 400) {
      await snack('error', 'Request error: file upload')
      return false
    }

    // unauthorized request
    if (response.status === 401) {
      if (await LOGIN.cred_expired(response.headers)) {
        await LOGIN.oauth_relogin()
      } else {
        await snack('error', json.info ? json.info : `${response.status}: Unauthorized request.`)
      }
      return false
    }

    if (response.status === 500) {
      await snack('error', 'An error occured: file upload')
      return false
    }
  } catch (e) {
    console.log(e)
    await snack('error', `something fatal happened while uploading (${filename})`)
    return false
  }
}
