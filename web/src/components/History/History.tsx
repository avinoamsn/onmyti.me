import { addDays, endOfDay, isSameDay } from 'date-fns'
import React, { useEffect, useState } from 'react'

import { useApolloClient, useLazyQuery } from '@redwoodjs/web'

import Day from '../Day'
import { compareAsc } from 'date-fns/esm'

const previousEntriesQuery = gql`
  query PreviousDayEntries($input: TimeframeInput) {
    entries(input: $input) {
      id
      content
      createdAt
    }
  }
`

/**
 * Helpers
 */

const isTodayFocused = (date: Date, focusedDate: string | Date): boolean =>
  isSameDay(date, new Date(focusedDate))

const isTodayGreaterThanTheFocusedDate = (
  date: Date,
  focusedDate: string | Date
): boolean => compareAsc(date, new Date(focusedDate)) === 1 // https://date-fns.org/v2.16.1/docs/compareAsc

// history, separated into each day entries were created
const getEntriesByDay = (entries: Entry[]) =>
  entries.reduce<Entry[][]>((acc, cur) => {
    const curEntryDate: string = cur.createdAt.slice(0, 10)

    // init array at date if there isn't one yet
    if (typeof acc[curEntryDate] === 'undefined') acc[curEntryDate] = []

    // add current entry to array at cur's date
    acc[curEntryDate] = [...acc[curEntryDate], cur]
    return acc
  }, [])

// used to access the appropriate days in the array returned in the above function
const getEntryDays = (entries: Entry[]) =>
  entries.reduce<string[]>((acc, cur, i) => {
    const curEntryDate: string = cur.createdAt.slice(0, 10)

    // base case
    if (acc.length === 0) acc.push(curEntryDate)
    // add date if it doesn't yet exist in arr
    else if (acc[acc.length - 1] !== curEntryDate) acc.push(curEntryDate)
    return acc
  }, [])

export const History: React.FC<{
  focusedDate: string
  setFocusedDate: React.Dispatch<string>
}> = ({ focusedDate, setFocusedDate }) => {
  const [entriesByDay, setEntriesByDay] = useState<Entry[][]>()
  const [entryDays, setEntryDays] = useState<string[]>()

  // query (moved out of Redwood Cell to circumvent auto-refreshing on `isFocused` update)
  const client = useApolloClient()
  const [getEntries] = useLazyQuery(previousEntriesQuery, {
    client,
    fetchPolicy: 'cache-and-network', // ? the default setting fails to re-fetch
    variables: { input: { to: endOfDay(addDays(new Date(), -1)) } }, // fetch up to yesterday (current day is left in `Today` component)
    onCompleted: ({ entries }) => {
      setEntriesByDay(getEntriesByDay(entries))
      setEntryDays(getEntryDays(entries))
    },
  })
  useEffect(() => getEntries(), [getEntries]) // initial query

  return entriesByDay && entryDays ? (
    <>
      <div id="history-cards">
        {entriesByDay[entryDays[0]] ? (
          <div className="border border-black border-opacity-20 rounded-lg p-2 w-80 h-96 max-h-96 absolute top-0.5 left-0.5 overflow-hidden bg-yellow-100 text-black text-opacity-20">
            <Day entries={entriesByDay[entryDays[0]]} isFocused={false} />
            {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
          </div>
        ) : null}

        {entriesByDay[entryDays[1]] ? (
          <div className="border-2 border-yellow-100 rounded-lg absolute top-3 left-3">
            <div className="border border-black border-opacity-30 rounded-lg p-2 w-80 h-96 max-h-96 overflow-hidden bg-yellow-100 text-black text-opacity-30">
              <Day entries={entriesByDay[entryDays[1]]} isFocused={false} />
            </div>
          </div>
        ) : null}

        {entriesByDay[entryDays[2]] ? (
          <div className="border-2 border-yellow-100 rounded-lg absolute top-6 left-6">
            <div className="border border-black border-opacity-30 rounded-lg p-2 w-80 h-96 max-h-96 overflow-hidden bg-yellow-100 text-black text-opacity-30">
              <Day entries={entriesByDay[entryDays[2]]} isFocused={false} />
            </div>
          </div>
        ) : null}
      </div>

      <div
        className={`border-2 border-yellow-100 rounded-lg absolute transition-all transform-gpu ${
          isTodayFocused(new Date(entryDays[1]), focusedDate)
            ? `top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2` // case date is focused
            : isTodayGreaterThanTheFocusedDate(
                new Date(entryDays[1]),
                focusedDate
              )
            ? `top-full left-1/2 -translate-x-1/2 -translate-y-4` // case date is in the future
            : `top-6 left-6` // case date is in the past
        }`}
      >
        <div
          className={`border border-black rounded-lg p-2 w-80 overflow-hidden bg-yellow-100 text-black transition-all ${
            isTodayFocused(new Date(entryDays[1]), focusedDate)
              ? `h-96 border-opacity-0 text-opacity-100`
              : isTodayGreaterThanTheFocusedDate(
                  new Date(entryDays[1]),
                  focusedDate
                )
              ? `h-16 border-opacity-40 text-opacity-0`
              : `h-96 border-opacity-40 text-opacity-40` // case date is in the past
          }`}
        >
          <Day entries={entriesByDay[entryDays[1]]} isFocused={false} />
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
