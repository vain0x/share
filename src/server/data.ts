const map = new Map()

export const setEntry = (key: string, value: string) => {
  if (typeof key === "string"
    && typeof value === "string"
    && key && key.length < 1024
    && value && value.length < 1024 * 1024
  ) {
    map.set(key, value)
  }
}

export const getEntry = (key: string) => {
  return map.get(key)
}
