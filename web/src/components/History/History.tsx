import { addDays, endOfDay } from 'date-fns'
import React, { useEffect, useState } from 'react'

import { useApolloClient, useLazyQuery } from '@redwoodjs/web'

import Day from '../Day'

const previousEntriesQuery = gql`
  query CurrentDayEntries($input: TimeframeInput) {
    entries(input: $input) {
      id
      content
      createdAt
    }
  }
`

export const History: React.FC<{ className?: string }> = ({ className }) => {
  const [entries, setEntries] = useState<Entry[]>()

  // query (moved out of Redwood Cell to circumvent auto-refreshing on `isFocused` update)
  const client = useApolloClient()
  const [getEntries] = useLazyQuery(previousEntriesQuery, {
    client,
    fetchPolicy: 'cache-and-network', // ? the default setting fails to re-fetch
    variables: { input: { to: endOfDay(addDays(new Date(), -1)) } }, // ? fetch up to yesterday
    onCompleted: ({ entries }) => setEntries(entries),
  })
  useEffect(() => getEntries(), [getEntries]) // initial query

  const getEntriesFromFocusedDate = (): Entry[] => {
    return entries
  }

  return entries ? (
    <div className={className}>
      <Day entries={entries} isFocused={false} />
    </div>
  ) : (
    <div className="pb-3 flex max-h-96">
      <span className="w-52 pr-5 sm:text-right">Loading...</span>
      <span className="flex-1" />
    </div>
  )
}

export default History
