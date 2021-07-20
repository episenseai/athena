import jwt_decode from 'jwt-decode'
import localForage from 'localforage'
import { writable, get } from 'svelte/store'

import {
  SIGNUP_SERVICE,
  LOGIN_SERVICE,
  LOGOUT_SERVICE,
  OAUTH2_LOGIN_SERVICE,
  OAUTH2_AUTH_CALLBACK_SERVICE,
} from '../../api/endpoints'
import { fetch_json_POST } from '../../api/fetch'
import { snack } from '../base/store/snack'

function signup_store() {
  const { subscribe, set } = writable(false)

  return {
    subscribe,

    // custom store method to handle signup
    signup: async (username, password) => {
      // logout before creating a new account
      if (get(LOGIN).success === true) {
        await snack(
          'warning',
          'Already signed in with a diiferent account; signout to create a new account',
        )
        return false
      }

      // call the signup endpoint
      const response = await fetch_json_POST(SIGNUP_SERVICE(), { username, password }, 'SIGNUP')

      // error
      if (!response) return false

      if (response.json.success) {
        // account created
        set(false)
        await snack('success', response.json.info)
        return true
        //console.log(response.json.data)
      }
      // error in account creation
      await snack('warning', response.json.info)
      return false
      // console.log(response.json.data)
    },

    // go to the signup page
    new: async () => {
      if (get(LOGIN).success === true) {
        await snack(
          'warning',
          'Already signed in with a diiferent account; signout to create a new account',
        )
        return
      }
      set(true)
    },

    // cancel the signup
    cancel: () => set(false),
  }
}

export const SIGNUP = signup_store()

function login_store() {
  const USTATE_KEY = 'ustatekey'
  const AUTH_KEY = 'authkey'

  const clean_auth_state = {
    success: false,
    jwt: undefined,
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
    set({})
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
      // call the login endpoint
      if (window.crypto.getRandomValues) {
        const byte_array = new Uint8Array(16)
        window.crypto.getRandomValues(byte_array)

        const ustate = Array.from(byte_array, (byte) => {
          return ('0' + (byte & 0xff).toString(16)).slice(-2)
        }).join('')
        console.log('Login not supported: ustate')

        const expires = new Date()
        expires.setMinutes(expires.getMinutes() + 5)
        const ustatekey = {
          ustate,
          redirect: window.location.href,
          expires,
        }
        const written = await write_ustatekey(ustatekey)
        if (!written || ustate !== written.ustate) {
          return false
        }
        window.location.href = OAUTH2_LOGIN_SERVICE(provider, ustate)
        return true
      }
      console.log('Login not supported')
      return false
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

            // try setting auth_state into local storage
            const auth_state = await write_auth({
              success: true,
              jwt: token.access_token,
              username: token.full_name || '',
              userid: token.userid,
              refresh_token: token.refresh_token || '',
              picture: token.picture || '',
              expires,
            })

            if (auth_state) {
              // set the authentication info in svelte 'LOGIN' store
              set(auth_state)
              const redirect = (await read_ustatekey()).redirect
              // reset 'ustatekey'
              await reset_ustate()
              await snack('success', 'Authorization successfull')
              // authorization complete; redirect to the page before the start of login flow
              window.location.href = redirect
              return true
            }
            await snack('error', 'Authorization failed')
            return false
          }
          console.log('ustate invalid')
          return false
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
        return false
      }
      return false
    },

    // Oauth logout
    oauth_logout: async () => {
      await reset_auth()
      await snack('info', 'Logged Out')
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
  }
}

export const LOGIN = login_store()
