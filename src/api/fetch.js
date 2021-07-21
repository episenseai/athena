import { LOGIN } from '../components/auth/store'
import { snack } from '../components/base/store/snack'
import { get } from 'svelte/store'

function get_auth_header() {
  const login_store = get(LOGIN)
  if (login_store.success && login_store.access_token) {
    return { Authorization: `Bearer ${login_store.access_token}` }
  }
  return {}
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
      mode: 'cors',
      // never cache request or response
      cache: 'no-store',
    }).catch(async (_) => {
      await snack(
        'error',
        'Either your lost your internet connectivity or episense ai server is down.',
      )
      return false
    })

    if (!response || !response.status) return false

    // parse json reponse
    const json = await response.json()

    // console.log(service_name, response)

    // good response
    if (response.status === 200 || response.status === 201) return { json }

    // unhadled error
    if (response.status === 500) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Unhandled server error occured while handling ${service_name} request`,
      )
      return false
    }

    // malformed request
    if (response.status === 400) {
      await snack(
        'error',
        json.info ? json.info : `HTTP error: ${response.status}; Malformed ${service_name} request`,
      )
      return false
    }

    // unauthorized request
    if (response.status === 401) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Unauthorized ${service_name} request. Wrong or expired credentials.`,
      )
      return false
    }
  } catch (e) {
    console.log(e)
    await snack(
      'error',
      `something fatal happened during ${service_name} Serivce request. Check console for details.`,
    )
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
      mode: 'cors',
      // never cache request or response
      cache: 'no-store',
    }).catch(async (_) => {
      await snack(
        'error',
        'Either your lost your internet connectivity or episense ai server is down.',
      )
      return false
    })

    if (!response || !response.status) return false

    // parse json reponse
    const json = await response.json()

    // for debugging
    // console.log(service_name, response)

    // good response
    if (response.status === 200 || response.status === 201) return { json }

    // unhadled error
    if (response.status === 500) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Unhandled server error occured while handling ${service_name} request`,
      )
      return false
    }

    // malformed request
    if (response.status === 400) {
      await snack(
        'error',
        json.info ? json.info : `HTTP error: ${response.status}; Malformed ${service_name} request`,
      )
      return false
    }

    // unauthorized request
    if (response.status === 401) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Unauthorized ${service_name} request. Wrong or expired credentials.`,
      )
      return false
    }
  } catch (e) {
    console.log(e)
    await snack(
      'error',
      `something fatal happened during ${service_name} Serivce request. Check console for details.`,
    )
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
      mode: 'cors',
      // never cache request or response
      cache: 'no-store',
    }).catch(async (_) => {
      await snack(
        'error',
        'Either your lost your internet connectivity or episense ai server is down.',
      )
      return false
    })

    if (!response || !response.status) return false

    // for debugging
    // console.log('FILE UPLOAD', response)

    // parse json reponse
    const json = await response.json()
    // for debugging
    // console.log('FILE UPLOAD', json)

    // good response
    if (response.status === 200 || response.status === 201) return { json }

    // unhadled error
    if (response.status === 500) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Unhandled server error while uploading file (${filename})`,
      )
      return false
    }

    // malformed request
    if (response.status === 400) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Malformed FILE UPLOAD request (${filename})`,
      )
      return false
    }

    // unauthorized request
    if (response.status === 401) {
      await snack(
        'error',
        json.info
          ? json.info
          : `HTTP error: ${response.status}; Unauthorized FILE UPLOAD request (${filename}). Wrong or expired credentials.`,
      )
      return false
    }
  } catch (e) {
    console.log(e)
    await snack(
      'error',
      `something fatal happened while uploading (${filename}). Check console for details.`,
    )
    return false
  }
}
