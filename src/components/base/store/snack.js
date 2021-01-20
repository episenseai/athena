import { writable } from 'svelte/store'
import { v4 as uuidv4 } from 'uuid'
const snacklist = writable([])

// type: one of ["info", "warning", "error", "success"]
async function snack(type, msg) {
  const timeout = 9000 // 9s
  const uuid = uuidv4()
  const func = setTimeout(() => remove(uuid), timeout)
  const timeOutFunc = () => {
    clearTimeout(func)
    remove(uuid)
  }
  // console.log(timeOutFunc)
  snacklist.update((val) => [{ uuid, type, msg, timeOutFunc }, ...val])
}

async function remove(uuid) {
  snacklist.update((val) => val.filter((s) => s.uuid !== uuid))
}

export { snacklist, snack }
