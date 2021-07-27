import { snack } from '$lib/base/snack'
import { OAUTH2_LOGIN_SERVICE, OAUTH2_AUTH_CALLBACK_SERVICE } from '../../api/endpoints'
import { v4 as uuidv4 } from '@lukeed/uuid'
import localForage from 'localforage'
import { writable } from 'svelte/store'

function login_store() {
  const USTATE_KEY = 'ustatekey'
  const AUTH_KEY = 'authkey'

  const clean_auth_state = {
    success: false,
    access_token: undefined,
    username: undefined,
    userid: undefined,
    expires: undefined,
  }

  // write the `ustatekey` to the local storage and returns the item written
  const write_ustatekey = async (current_ustatekey, erro_msg = '') => {
    const ustate = await localForage
      .setItem(USTATE_KEY, current_ustatekey)
      .then(() => localForage.getItem(USTATE_KEY))
      .catch((err) => console.log(erro_msg, err))
    if (ustate) return ustate
    return false
  }

  // reads the `ustatekey` from the local storage
  const read_ustatekey = async (erro_msg = '') => {
    const ustatekey = await localForage
      .getItem(USTATE_KEY)
      .catch((err) => console.log(erro_msg, err))
    if (ustatekey) return ustatekey
    return false
  }

  // write the auth state to the local storage and returns the item written
  const write_auth = async (current_auth_state, erro_msg = '') => {
    const auth_state = await localForage
      .setItem(AUTH_KEY, current_auth_state)
      .then(() => localForage.getItem(AUTH_KEY))
      .catch((err) => console.log(erro_msg, err))
    if (auth_state) {
      set(auth_state)
      return auth_state
    }
    return false
  }

  // reads the auth state from the local storage
  const read_auth = async (erro_msg = '') => {
    const auth_state = await localForage
      .getItem(AUTH_KEY)
      .catch((err) => console.log(erro_msg, err))
    if (auth_state) return auth_state
    return false
  }

  const check_ustate_validity = async (ustate) => {
    const ustatekey = await read_ustatekey()
    if (!ustatekey) return false
    if (ustatekey.ustate !== ustate) return false
    if (new Date() - ustatekey.expires > 0) return false
    if (new URL(ustatekey.redirect).host !== window.location.host) return false
    return true
  }

  const check_token_validity = async (token) => {
    if (!token) return false
    if (!token.access_token || !token.expires_in || !token.userid) return false
    return true
  }

  const reset_ustate = async () => {
    await write_ustatekey({})
  }

  const reset_auth = async () => {
    await reset_ustate()
    await write_auth(clean_auth_state)
    set(clean_auth_state)
  }

  const { subscribe, set } = writable(clean_auth_state)

  return {
    // a store must have a subscribe method
    subscribe,

    reset_ustate: async () => {
      await reset_ustate()
    },

    // Oauth login with github, google, ...
    oauth_login: async (provider) => {
      // reset previous login token
      await reset_auth()
      // generate non-cryptographically secure uuidv4
      const ustate = uuidv4()

      const expires = new Date()
      expires.setMinutes(expires.getMinutes() + 5)

      let redirect
      if (window.location.pathname.startsWith('/auth/callback')) {
        redirect = window.location.origin
      } else {
        redirect = window.location.href
      }
      const ustatekey = {
        ustate,
        redirect,
        expires,
      }

      const written = await write_ustatekey(ustatekey)
      if (!written || ustate !== written.ustate) {
        return false
      }
      window.location.href = OAUTH2_LOGIN_SERVICE(provider, ustate)
      return true
    },

    oauth_callback: async (code, state, scope_query) => {
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
          await snack(
            'error',
            'Lost internet connectivity or the episense server is not responding.',
          )
          return undefined
        })

        if (response && response.status === 200) {
          const token = await response.json()
          if (
            token.ustate &&
            (await check_token_validity(token)) &&
            (await check_ustate_validity(token.ustate))
          ) {
            const expires = new Date()
            expires.setSeconds(expires.getSeconds() + token.expires_in)

            let picture
            if (token.picture && token.picture !== '') {
              picture = token.picture
            } else {
              picture = undefined
            }
            // try setting auth_state into local storage
            const auth_state = await write_auth({
              success: true,
              access_token: token.access_token,
              username: token.full_name || '',
              userid: token.userid,
              refresh_token: token.refresh_token || undefined,
              picture,
              expires,
            })

            if (auth_state) {
              // set the authentication info in svelte 'LOGIN' store
              set(auth_state)
              const redirect_url = (await read_ustatekey()).redirect
              // reset 'ustatekey'
              await reset_ustate()
              await snack('success', 'Authorization successfull')

              // [success, new_user, redirect_url]
              return [true, CURRENT_USER != token.userid, redirect_url]
            }
            await snack('error', 'Authorization failed')
            return [false, false, '']
          }
          return [false, false, '']
        }
        if (response && response.status === 401) {
          let error = await response
            .json()
            .then((value) => {
              if (value && value.detail) {
                return value
              }
              return { detail: 'Authorization failed' }
            })
            .catch(() => {
              return {
                detail: 'Authorization failed',
              }
            })
          await snack('error', error.detail)
        }
        return [false, false, '']
      }
      return [false, false, '']
    },

    // Oauth logout
    oauth_logout: async () => {
      await reset_auth()
      await snack('info', 'Logged Out')
      return true
    },

    // relogin when the credential is expired
    oauth_relogin: async () => {
      await write_auth(clean_auth_state)
      set(clean_auth_state)
      return true
    },

    init_auth: async () => {
      let load_state = await read_auth(
        'error reading auth state from local storage while initialization',
      )
      if (!load_state || !load_state.success) {
        load_state = await write_auth(
          clean_auth_state,
          'error writing auth state to local storage while initialization',
        )
        set(load_state)
        return false
      }
      set(load_state)
      // console.log(load_state)
      return true
    },

    cred_expired: async (headers) => headers.get('X-Expired-AccessToken') == 1,
  }
}

export const LOGIN = login_store()

let CURRENT_USER = '0'
