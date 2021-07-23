// sleep time expects milliseconds
export function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time))
}
