import React, { useEffect } from 'react'

/**
 * Persist state using local storage.
 * See https://bit.ly/31IIgND
 *
 * @param key the unique key for the object being stored
 * @param defaultValue the default value for the state object
 */
export const usePersistentState = (
  key: string,
  defaultValue: unknown
): [unknown, React.Dispatch<unknown>] => {
  const item = JSON.parse(localStorage.getItem(key)) || defaultValue

  // use persisted state for an array only if its length
  // is the same as the defaultValue length otherwise you
  // may end up with an unpredictable state
  const [state, setState] = React.useState(() =>
    Array.isArray(item) && Array.isArray(defaultValue)
      ? item.length === defaultValue.length
        ? item
        : defaultValue
      : item
  )

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])

  return [state, setState]
}
