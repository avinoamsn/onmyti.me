import { addDays, endOfDay, isSameDay } from 'date-fns'
import React, { useEffect, useState } from 'react'

import { useApolloClient, useLazyQuery } from '@redwoodjs/web'

import Day from '../Day'
import { compareAsc } from 'date-fns/esm'

const previousEntriesQuery = gql`
  query CurrentDayEntries($input: TimeframeInput) {
    entries(input: $input) {
      id
      content
      createdAt
    }
  }
`

export const History: React.FC<{
  focusedDate: string
  setFocusedDate: React.Dispatch<string>
}> = ({ focusedDate, setFocusedDate }) => {
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

  // const getEntriesFromDate = (): Entry[] => {
  //   return entries
  // }

  const isTodayFocused = (date: Date): boolean =>
    isSameDay(date, new Date(focusedDate))

  const isTodayGreaterThanTheFocusedDate = (date: Date): boolean =>
    compareAsc(date, new Date(focusedDate)) === 1 // https://date-fns.org/v2.16.1/docs/compareAsc

  return entries ? (
    <>
      <div className="border border-black border-opacity-20 rounded-lg p-2 w-80 h-96 max-h-96 absolute top-0.5 left-0.5 overflow-hidden bg-yellow-100 text-black text-opacity-20">
        <Day entries={entries} isFocused={false} />
        {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
      </div>

      <div className="border-2 border-yellow-100 rounded-lg absolute top-3 left-3">
        <div className="border border-black border-opacity-30 rounded-lg p-2 w-80 h-96 max-h-96 overflow-hidden bg-yellow-100 text-black text-opacity-30">
          <Day entries={entries} isFocused={false} />
          {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
        </div>
      </div>

      <div
        className={`border-2 border-yellow-100 rounded-lg absolute transition-all transform-gpu ${
          isTodayFocused(addDays(new Date(), -1))
            ? `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2`
            : isTodayGreaterThanTheFocusedDate(addDays(new Date(), -1))
            ? `top-full left-1/2 -translate-x-1/2 -translate-y-4`
            : `top-6 left-6` // case date is in the past
        }`}
      >
        <div
          className={`border border-black rounded-lg p-2 w-80 overflow-hidden bg-yellow-100 text-black transition-all ${
            isTodayFocused(addDays(new Date(), -1))
              ? `h-96 border-opacity-0 text-opacity-100`
              : isTodayGreaterThanTheFocusedDate(addDays(new Date(), -1))
              ? `h-16 border-opacity-40 text-opacity-0`
              : `h-96 border-opacity-40 text-opacity-40` // case date is in the past
          }`}
        >
          <Day entries={entries} isFocused={false} />
          {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
        </div>
      </div>
    </>
  ) : (
    <div className="flex">
      <span className="w-52 pr-5 sm:text-right">Loading...</span>
      <span className="flex-1" />
    </div>
  )
}

export default History
