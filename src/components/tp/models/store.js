import { writable } from 'svelte/store'

export const activeTabs = writable({})

export const models = writable([])

export const modelType = writable(undefined)

export const activeModels = writable({})

export const optimizeUsing = writable(undefined)
//  reset necessary when switching project
export function reset_model_stores() {
  optimizeUsing.set(undefined)
  activeTabs.set({})
  models.set([])
  modelType.set(undefined)
  activeModels.set({})
}

export const model_store = writable({})
