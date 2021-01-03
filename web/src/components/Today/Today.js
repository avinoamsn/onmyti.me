import { startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'

import { useApolloClient, useLazyQuery } from '@redwoodjs/web'

import CurrentEntry from './CurrentEntry'
import EarlierEntries from './EarlierEntries'

const currentDayEntriesQuery = gql`
  query CurrentDayEntries($input: TimeframeInput) {
    entries(input: $input) {
      id
      content
      createdAt
    }
  }
`

export const Today = ({ isFocused, setFocusedDate }) => {
  const [entries, setEntries] = useState()

  // query (moved out of Redwood Cell to circumvent auto-refreshing on `isFocused` update)
  const client = useApolloClient()
  const [getEntries] = useLazyQuery(currentDayEntriesQuery, {
    client,
    fetchPolicy: 'cache-and-network', // ? the default setting fails to re-fetch
    variables: { input: { from: startOfToday() } }, // ? fetch only today's entries
    onCompleted: ({ entries }) => setEntries(entries),
  })
  useEffect(() => getEntries(), [getEntries]) // initial query

  return (
    <div
      id="today"
      // ! the second parent here was initially meant to hack a gradient-colored border, but it's not currently used that way and couild be refactored out (the below comment explains the original thinking)
      // ? `via-yellow-100` hack used to start gradient earlier up in the component (so the border bg doesn't extend to the bottom) – `bg-gradient-to-b from-black via-yellow-100 to-yellow-100`
      className={`w-full max-w-xl border-2 border-yellow-100 rounded-lg absolute -translate-x-1/2 left-1/2 transition-all transform-gpu ${
        isFocused ? `-translate-y-1/2 top-1/2 border-opacity-0` : `top-full`
      }`}
    >
      <div
        className={`p-2 w-full border border-black rounded-lg bg-yellow-100 transition-all ${
          isFocused
            ? `border-opacity-0 bg-opacity-75`
            : `border-opacity-50  bg-opacity-100`
        }`}
      >
        <EarlierEntries isFocused={isFocused} entries={entries} />
        <CurrentEntry isFocused={isFocused} getEntries={getEntries} />
      </div>

      {/* Anchor cover so that Today component is clickable when it isn't focused */}
      {!isFocused ? (
        <a
          className="absolute top-0 w-full h-full cursor-pointer"
          onClick={() => (isFocused ? null : setFocusedDate(startOfToday()))}
        />
      ) : null}
    </div>
  )
}

export default Today
