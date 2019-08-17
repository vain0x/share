const MAX_KEY_LENGTH = 256
const MAX_VALUE_LENGTH = 1024 * 1024
const MAX_ENTRY_COUNT = 1024

const map = new Map()

const validatePair = (key: string, value: string) =>
  typeof key === "string"
  && typeof value === "string"
  && key && key.length < MAX_KEY_LENGTH
  && value && value.length < MAX_VALUE_LENGTH

export const initializeEntries = () => {
  map.clear()
  map.set("pi", "3.1415926535897932")
}

export const setEntry = (key: string, value: string) => {
  if (!validatePair(key, value)) {
    return
  }

  if (map.size >= MAX_ENTRY_COUNT) {
    initializeEntries()
  }

  map.set(key, value)
}

export const getEntry = (key: string) => {
  return map.get(key)
}
