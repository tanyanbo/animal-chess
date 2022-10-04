export function setTimeoutPromise(ms: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, ms))
}
