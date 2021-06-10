import { writable, get } from 'svelte/store'
import { snack } from '../base/store/snack'
import jwt_decode from 'jwt-decode'
import localForage from 'localforage'
import { fetch_json_POST } from '../../api/fetch'
import { SIGNUP_SERVICE, LOGIN_SERVICE, LOGOUT_SERVICE } from '../../api/endpoints'

const AUTH_KEY = 'authkey123'

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
          'Already signed in with a diiferent account; signout to create a new account'
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
          'Already signed in with a diiferent account; signout to create a new account'
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
  const clean_state = { success: false, jwt: undefined, username: undefined, userid: undefined }

  // write the auth state to the local storage and returns the item written
  const write_auth = async (current_auth_state, erro_msg) => {
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
  const read_auth = async (erro_msg) => {
    const auth_state = await localForage
      .getItem(AUTH_KEY)
      .catch((err) => console.log(erro_msg, err))
    if (auth_state) return auth_state
    return false
  }

  const { subscribe, set } = writable(clean_state)

  return {
    // a store must have a subscribe method
    subscribe,

    // custom store method for authentication
    login: async (username, password) => {
      // check if the user if already logged in
      if (get(LOGIN).success === true) {
        await LOGIN.logout()
      }

      // call the login endpoint
      const response = await fetch_json_POST(LOGIN_SERVICE(), { username, password }, 'LOGIN')
      // server error
      if (!response) return

      if (response.json.success) {
        // login success
        const decoded = jwt_decode(response.json.data.jwt)
        // try putting the auth onto local storage
        const auth_state = await write_auth(
          {
            success: true,
            jwt: response.json.data.jwt,
            username: decoded.username,
            userid: decoded.userid,
          },
          'error setting local auth storage after successfull login '
        )

        // on success, set the authentication info in svelte store
        if (auth_state) {
          set(auth_state)
          await snack('success', response.json.info)
        }

        // console.log(jwt_decode(response.json.data.jwt))
      } else {
        // login error
        await snack('warning', response.json.info)
        // console.log(response.json.data)
      }
    },

    // custom store method to reset the authentication token
    logout: async () => {
      if (get(LOGIN).success === false) {
        await snack('warning', 'You are not signed in??')
        return
      }
      // call the logout endpoint
      const response = await fetch_json_POST(LOGOUT_SERVICE(), {}, 'LOGOUT')

      // error
      if (!response) return false

      if (response.json.success) {
        // successfully logged out
        // reset the local storage auth state
        const auth_state = await write_auth(
          clean_state,
          'error resetting auth state to local storage while logout'
        )
        if (auth_state) {
          // if reset is successfull, reset the value in svelte store
          set(auth_state)
          await snack('success', response.json.info)
        }
        return true
      }
      // can not log out
      await snack('warning', response.json.info)
      return false
    },

    init_auth: async () => {
      let load_state = await read_auth(
        'error reading auth state from local storage while initialization'
      )
      if (!load_state || !load_state.success) {
        load_state = await write_auth(
          clean_state,
          'error writing auth state to local storage while initialization'
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
