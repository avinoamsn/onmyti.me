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

export const Today = ({ isFocused, setFocusedDate, className }) => {
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
      className={`max-w-xl relative transition-all transform-gpu ${
        isFocused ? `` : `translate-y-40 opacity-50`
      } ${className}`}
    >
      <EarlierEntries isFocused={isFocused} entries={entries} />
      <CurrentEntry isFocused={isFocused} getEntries={getEntries} />

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
