import { Ref, ref, UnwrapRef, watch } from 'vue'

type JSONValue = string | number | boolean | null | JSONArray | JSONObject

interface JSONObject {
  [k: string]: JSONValue
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface JSONArray extends Array<JSONValue> {}

function getPersistedValueOrFallback<T extends JSONValue>(
  localStorageKey: string,
  fallbackValue: T
): T {
  const persistedValue = localStorage.getItem(localStorageKey)
  if (persistedValue === null) {
    return fallbackValue
  }

  try {
    return JSON.parse(persistedValue) as T
  } catch (error) {
    return fallbackValue
  }
}

export function persistedRef<T extends JSONValue>(
  localStorageKey: string,
  fallbackValue: T
): Ref<UnwrapRef<T>> {
  const value = ref<T>(
    getPersistedValueOrFallback(localStorageKey, fallbackValue)
  )

  watch(
    value,
    (newValue) => {
      window.localStorage.setItem(localStorageKey, JSON.stringify(newValue))
    },
    { immediate: true }
  )

  return value
}
