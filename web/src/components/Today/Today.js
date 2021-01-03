import { startOfToday } from 'date-fns'
import { useEffect, useState } from 'react'
import { Flipper, Flipped } from 'react-flip-toolkit'
import _ from 'lodash'

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

  // arr used to flip element order on focus/unfocus with react-flip-toolkit
  const [todayEls, setTodayEls] = useState()
  useEffect(() => {
    const elList = [
      {
        src: (
          <EarlierEntries
            isFocused={isFocused}
            entries={entries}
            id="earlier-entries"
          />
        ),
      },
      {
        src: (
          <CurrentEntry
            isFocused={isFocused}
            getEntries={getEntries}
            id="current-entry"
          />
        ),
      },
    ]

    isFocused
      ? setTodayEls([...elList])
      : setTodayEls([...elList.slice().reverse()])
  }, [isFocused, entries, getEntries])

  console.log(
    todayEls && `${todayEls[0].src.props.id + todayEls[1].src.props.id}`
  )
  return (
    <div
      id="today"
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
        {todayEls ? (
          <Flipper
            flipKey={`${todayEls[0].src.props.id + todayEls[1].src.props.id}`}
            spring={{ stiffness: 750, damping: 50 }}
          >
            {todayEls.map((el) => (
              <Flipped key={el.src.props.id} flipId={el.src.props.id}>
                {el.src}
              </Flipped>
            ))}
          </Flipper>
        ) : null}
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
