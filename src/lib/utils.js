// sleep time expects milliseconds
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

// check if object is empty
export function is_empty(obj) {
  obj && Object.keys(obj).length === 0 && obj.constructor === Object
}

// check if the value is a finite number and not a NaN
export const isNumber = (x) => typeof x === 'number' && !isNaN(x) && isFinite(x)
