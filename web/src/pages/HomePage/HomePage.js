import { useEffect, useState } from 'react'
import { addDays, isToday, startOfToday, endOfToday, formatISO } from 'date-fns'
import _ from 'lodash'

import { usePersistentState } from 'src/hooks'

import HomeLayout from 'src/layouts/HomeLayout'

import History from 'src/components/History'
import Today from 'src/components/Today'

const HomePage = () => {
  // persist the focused date on reload
  const [focusedDate, setFocusedDate] = usePersistentState(
    `focusedDate`,
    formatISO(startOfToday())
  )

  // bool & effect for setting the `isTodayFocused` bool
  const [isTodayFocused, setIsTodayFocused] = useState(isToday(focusedDate))
  useEffect(
    () =>
      isToday(focusedDate) ? setIsTodayFocused(true) : setIsTodayFocused(false),
    [focusedDate]
  )

  // capture arrow key (up/down) interaction
  // ? this previously also used the wheel scroll action, but that proved too
  // ? unreliable–may eventually revisit
  useEffect(() => {
    const onArrowPress = (e) => {
      if (e.code === 'ArrowUp') setFocusedDate(addDays(focusedDate, -1))
      if (e.code === 'ArrowDown')
        setFocusedDate(
          new Date(
            Math.min(addDays(focusedDate, 1).getTime(), endOfToday().getTime()) // prevent user from scrolling into the future
          )
        )
    }
    window.addEventListener('keydown', onArrowPress)

    return () => {
      window.removeEventListener('keydown', onArrowPress)
    }
  })

  return (
    <HomeLayout>
      <History
        focusedDate={focusedDate}
        setFocusedDate={setFocusedDate}
        className="md:col-start-1 row-start-1"
      />
      <Today
        isFocused={isTodayFocused}
        setFocusedDate={setFocusedDate}
        className="md:col-start-4 md:col-span-4 row-start-3"
      />
    </HomeLayout>
  )
}

export default HomePage
