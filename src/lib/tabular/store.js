import { LOGIN } from '$lib/auth/store'
import { snack } from '$lib/base/snack'
import {
  TAB_CREATE_PROJECTS_SERVICE,
  TAB_PROJECTS_LIST_SERVICE,
  TAB_SET_PROJECT_SERVICE,
  TAB_PIPE_GET_SERVICE,
  TAB_PIPE_POST_SERVICE,
  TAB_REVERT_STAGE_SERVICE,
  TAB_UNFREEZE_PIPE_SERVICE,
  GET_SSE_TOKEN_SERVICE,
  SSE_UPDATE_SERVICE,
  TAB_MODEL_BUILD_SERVICE,
  SSE_MODELS_UPDATE_SERVICE,
  TAB_MODELS_SERVICE,
  TAB_MODEL_CANCEL_SERVICE,
} from '../../api/endpoints'
import { fetch_json_POST, fetch_json_GET } from '../../api/fetch'
import modelsInfo from '../../routes/tabular/models/_mock/models.js'
import { models, reset_model_stores } from './models/store'
import localForage from 'localforage'
import { writable, get } from 'svelte/store'

export const GET_DATA = writable({})
// {
//   stage: "consume:GET",
//   data: { ... }
// }

export const POST_DATA = writable({})
// {
//   stage: "consume:POST",
//   data: { ... }
// }

// event source for pipe update
let es = undefined
// event source for models update
let es_models = undefined
// only save the projectid and get the rest of the data from the server
const PROJ_ID_KEY = 'projkey123'

function project_store() {
  const BLANK_TEMPLATE = {
    id: undefined,
    name: undefined,
    timestamp: undefined,
    current_stage: undefined,
    pipe_status: undefined,
    error_type: undefined,
    error_stack: undefined,
  }

  // write the auth state to the local storage and returns the item written
  const write_proj = async (current_proj_id, erro_msg = '') => {
    const proj_id = await localForage
      .setItem(PROJ_ID_KEY, current_proj_id)
      .then(() => localForage.getItem(PROJ_ID_KEY))
      .catch((err) => console.log(erro_msg, err))
    if (proj_id) {
      return proj_id
    }
    return false
  }

  // reads the auth state from the local storage
  const read_proj = async (erro_msg = '') => {
    const proj_id = await localForage
      .getItem(PROJ_ID_KEY)
      .catch((err) => console.log(erro_msg, err))
    if (proj_id) return proj_id
    return false
  }

  const { subscribe, set } = writable(BLANK_TEMPLATE)

  return {
    subscribe,
    new: async (projectname, projectdesc) => {
      // call the cerate project endpoint
      const response = await fetch_json_POST(
        TAB_CREATE_PROJECTS_SERVICE(get(LOGIN).userid),
        { projectname, projectdesc },
        'CREATE PROJECT',
      )
      if (response && response.json.success) {
        // project created
        await snack('success', response.json.info)
      }
      return response
    },
    set_state: async (projectid) => {
      // sets current / working project
      const current_proj_id = get(PROJECT).id
      const response = await fetch_json_POST(
        TAB_SET_PROJECT_SERVICE(get(LOGIN).userid, projectid),
        {},
        'SET PROJECT',
      )

      if (response && response.json.success) {
        // project created
        await write_proj(response.json.data.id, 'Could not set the project id into local storage')
        set(BLANK_TEMPLATE)
        set(response.json.data)
        await snack('success', response.json.info)
        if (current_proj_id !== get(PROJECT).id && get(PROJECT).pipe_status === '1') {
          reset_model_stores()
        }
        if (get(PROJECT).pipe_status === '0') {
          await snack('info', `Your are on the ${get(PROJECT).current_stage} stage of the pipeline`)
        } else if (get(PROJECT).pipe_status === '1') {
          await snack('info', `You are on MODELS view of the pipeline`)
        } else if (get(PROJECT).pipe_status === '-1') {
          await snack('warning', `A pipeline error has occured while processing.`)
        }

        // download stage data when switching project
        if (get(SWITCH_PROJECT)) {
          await PROJECT.get_pipe({ current_stage: get(PROJECT).current_stage })
          SWITCH_PROJECT.set(false)
        }
      }
    },

    switch_proj: async (projectid) => {
      await PROJECT.set_state(projectid)
      // temp hack to fix issue when swithcing project at finalconfig:GET
      //location.reload()
    },
    init_proj: async () => {
      const porj_id = await read_proj(
        'error reading project id from local storage while initialization',
      )
      if (!porj_id || typeof porj_id !== 'string' || porj_id === '') {
        await write_proj('', 'error writing auth state to local storage while initialization')
        return false
      }
      await PROJECT.set_state(porj_id)
      // console.log(load_state)
      return true
    },
    reset_proj: async () => {
      set(BLANK_TEMPLATE)
      await write_proj('', 'Could not set the project id into local storage')
    },
    get_pipe: async (data) => {
      // GET data for the current stage
      const response = await fetch_json_POST(
        TAB_PIPE_GET_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        data,
        'GET STAGE DATA',
      )
      if (!response) return false
      if (response.json.success) {
        GET_DATA.set(response.json.data)
        await ('success', response.json.info)
        return true
      }
    },
    post_pipe: async (data) => {
      // POST data for the next stage
      const response = await fetch_json_POST(
        TAB_PIPE_POST_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        data,
        'POST STAGE DATA',
      )
      if (!response) return
      if (response.json.success) {
        set(response.json.data)
        await ('success', response.json.info)
      }
    },
    list_all: async () => {
      // list all projects
      const response = await fetch_json_GET(
        TAB_PROJECTS_LIST_SERVICE(get(LOGIN).userid),
        'LIST PROJECTS',
      )

      if (response && response.json.success) {
        // project created
        return response.json.data
      }
      return undefined
    },
    unfreeze: async () => {
      // unfreeze an error in project
      const response = await fetch_json_POST(
        TAB_UNFREEZE_PIPE_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        {},
        'UNFREEZE PIPE',
      )
      if (!response) return false
      if (response.json.success) {
        await snack('success', response.json.info)
        // console.log(response.json.data)
        set(response.json.data)
        await PROJECT.get_pipe({ current_stage: get(PROJECT).current_stage })
        return true
      }
    },
    revert: async (from_stage, to_stage) => {
      // revert to a previous stage
      const response = await fetch_json_POST(
        TAB_REVERT_STAGE_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        { from: from_stage, to: to_stage },
        'UNFREEZE PIPE',
      )
      if (!response) return false
      if (response.json.success) {
        await snack('success', response.json.info)
        set(response.json.data)
        //await PROJECT.get_pipe({ current_stage: get(PROJECT).current_stage })
        return true
      }
    },

    sse_update: async () => {
      try {
        if (!('EventSource' in window)) {
          await snack(
            'warning',
            'Your browser does not support SSE. You have to manully refresh your browser to check the progress of pipeline. Or, you can switch to Chrome, Safari or Mozilla.',
          )
          return false
        }
        await PROJECT.sse_close()
        const token = await PROJECT.get_token()
        if (!token) {
          return false
        }
        //console.log(token)
        es = new EventSource(SSE_UPDATE_SERVICE(get(LOGIN).userid, get(PROJECT).id, token), {
          withCredentials: true,
        })
        es.addEventListener(
          'message',
          async (e) => {
            // base64 decode
            const decoded = window.atob(e.data)
            // json parse the string after decoding
            const pipe_state = JSON.parse(decoded)
            //SSE.set(decoded)

            if (pipe_state.id !== get(PROJECT).id) {
              await PROJECT.sse_close()
            }

            //console.log(es instanceof EventSource, es.constructor.name)
            if (get(PROJECT).current_stage.split(':')[1] !== 'GET') {
              if (
                pipe_state.pipe_status !== get(PROJECT).pipe_status ||
                pipe_state.current_stage !== get(PROJECT).current_stage
              ) {
                set(pipe_state)
              }
            }
            if (get(PROJECT).pipe_status === '1') {
              await PROJECT.sse_close()
            }
          },
          false,
        )
        es.onerror = async (_) => {
          await snack(
            'error',
            'An error occurred while checking the progress models. You may have to refresh to check the progress.',
          )
          await PROJECT.sse_close()
        }
      } catch (e) {
        console.log('event source exception: ', e)
      }
    },

    sse_close: async () => {
      if (es) {
        if (es instanceof EventSource || es.constructor.name === 'EventSource') {
          es.close()
        }
      }
      es = undefined
    },

    get_token: async () => {
      const response = await fetch_json_GET(
        GET_SSE_TOKEN_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        'GET SSE TOKEN',
      )
      if (!response) return false
      if (response.json.success) {
        return response.json.data.token
      }
      return false
    },

    model_build: async (modelids = [], changed_hparams = {}, init = false) => {
      // console.log(modelids)
      const response = await fetch_json_POST(
        TAB_MODEL_BUILD_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        { modelids, changed_hparams, init },
        'MODEL BUILD SERVICE',
      )
      if (!response) return false
      // console.log(response.json)
      if (response.json.success) {
        set(response.json.data)
        await snack('success', response.json.info)
        return true
      }
      return false
    },
    cancel_model: async (modelid) => {
      const response = await fetch_json_POST(
        TAB_MODEL_CANCEL_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        { modelid },
        'CANCEL MODEl JOB',
      )
      if (!response) return false
      // console.log(new_model)
      if (response.json.success) {
        await snack('warning', response.json.info)
        return true
      }
      await snack('error', response.json.info)
      return false
    },

    sse_models_update: async (rerun = false) => {
      try {
        if (!('EventSource' in window)) {
          await snack(
            'warning',
            'Your browser does not support SSE. You have to manully refresh your browser to check the progress of models. Or, you can switch to Chrome, Safari or Mozilla.',
          )
          return false
        }
        if (
          !rerun &&
          get(models).findIndex(
            (el) => el.status === 'WAIT' || el.status === 'RUNNING' || el.status === 'TRYCANCEL',
          ) === -1
        ) {
          // console.log('All models already done. no sse required')
          return
        }
        await PROJECT.sse_models_close()
        const token = await PROJECT.get_token()
        if (!token) {
          return false
        }
        //console.log(token)
        es_models = new EventSource(
          SSE_MODELS_UPDATE_SERVICE(get(LOGIN).userid, get(PROJECT).id, token),
          {
            withCredentials: true,
          },
        )
        es_models.addEventListener(
          'message',
          async (e) => {
            // base64 decode
            const decoded = window.atob(e.data)
            // json parse the string after decoding
            const models_status = JSON.parse(decoded)
            //SSE.set(decoded)
            // console.log(models_status)
            // for (const [key, value] of Object.entries(models_status.data)) {
            //   console.log(`${key}: ${value}`)
            // }
            if (models_status.projectid === get(PROJECT).id && get(PROJECT).pipe_status === '1') {
              // console.log('right project')
              const data = models_status.data
              const done_models = []
              models.update((ms) => {
                // console.log(ms)
                const new_models = ms.map((m) => {
                  if (!(m.id in data)) {
                    // console.log(m.id, ' not in data')
                    return m
                  }
                  if (m.status === data[m.id]) {
                    // console.log(m.id, ' status unchanged')
                    // m.status = 'DONE' // @debugging
                    return m
                  }
                  if (data[m.id] !== 'DONE') {
                    // console.log(m.id, ' status changed but not done')
                    if (data[m.id] === 'ERROR') {
                      snack(
                        'error',
                        `Error building ${m.name} model for the ${get(PROJECT).name} project`,
                      ).then((val) => val)
                    } else if (data[m.id] === 'CANCELLED') {
                      snack(
                        'error',
                        `Cancelled building ${m.name} model for the ${get(PROJECT).name} project`,
                      ).then((val) => val)
                    }
                    m.status = data[m.id]
                    return m
                  }
                  // console.log(m.id, ' status done')
                  done_models.push(m.id)
                  return m
                })
                // console.log('new models', new_models)
                return new_models
              })
              if (done_models.length > 0) {
                // console.log("Data to be downloaded for these models")
                // console.log(done_models)
                const promises = done_models.map(PROJECT.get_model_by_id)
                Promise.all(promises).then((vals) => {
                  return vals
                })
              }
              if (
                get(models).findIndex(
                  (el) =>
                    el.status === 'WAIT' || el.status === 'RUNNING' || el.status === 'TRYCANCEL',
                ) === -1
              ) {
                await PROJECT.sse_models_close()
                snack('info', `All the models completed for the ${get(PROJECT).name} project`).then(
                  (val) => val,
                )
                // console.log('All models finished. closing sse')
              }
            } else {
              await PROJECT.sse_models_close()
            }
          },
          false,
        )
        es_models.onerror = async (_) => {
          await snack(
            'error',
            'An error occurred while checking the progress models. You may have to refresh to check the progress.',
          )
          await PROJECT.sse_models_close()
        }
      } catch (e) {
        console.log('event source exception: ', e)
      }
    },
    sse_models_close: async () => {
      if (es_models) {
        if (es_models instanceof EventSource || es.constructor.name === 'EventSource') {
          es_models.close()
        }
      }
      es_models = undefined
    },
    get_model_by_id: async (modelid) => {
      const response = await fetch_json_POST(
        TAB_MODELS_SERVICE(get(LOGIN).userid, get(PROJECT).id),
        { modelid },
        'GET MODEL BY ID',
      )
      if (!response) return false
      let new_model = response.json.data
      // console.log(new_model)
      if (response.json.success) {
        models.update((ms) => {
          const idx = ms.findIndex((el) => el.id === new_model.id)
          if (idx >= 0) {
            new_model = {
              ...new_model,
              ...modelsInfo.models.find((el) => new_model.id === el.id),
            }
            //console.log(new_model)
            ms[idx] = new_model
            // console.log("Downloaded and set new model data....")
            // console.log(ms[idx])
            return ms
          }
        })
        if (new_model.status === 'DONE') {
          await snack(
            'success',
            `Completed building ${new_model.name} model for the ${get(PROJECT).name} project`,
          )
        } else if (new_model.status === 'RUNNING') {
          await snack(
            'info',
            `Started building ${new_model.name} model for the ${get(PROJECT).name} project`,
          )
        } else if (new_model.status === 'ERROR') {
          await snack(
            'error',
            `Error occurred while building ${new_model.name} model for the ${
              get(PROJECT).name
            } project`,
          )
        } else if (new_model.status === 'CANCELLED') {
          await snack(
            'warning',
            `Cancelled building ${new_model.name} model for the ${get(PROJECT).name} project`,
          )
        }
      }
      return true
    },
  }
}
export const PROJECT = project_store()

export const SWITCH_PROJECT = writable(false)
