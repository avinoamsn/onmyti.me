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
      {/* History (all previous days) */}
      <div className="md:col-start-1 md:col-span-3 mt-4 relative">
        <div className="border border-black border-opacity-20 rounded-lg p-2 w-80 h-96 max-h-96 absolute top-0.5 left-0.5 overflow-hidden flex items-start bg-yellow-100 text-black text-opacity-20">
          <History focusedDate={focusedDate} setFocusedDate={setFocusedDate} />
          {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
        </div>

        <div className="border-2 border-yellow-100 rounded-lg absolute top-3 left-3">
          <div className="border border-black border-opacity-30 rounded-lg p-2 w-80 h-96 max-h-96 overflow-hidden flex items-start bg-yellow-100 text-black text-opacity-30">
            <History
              focusedDate={focusedDate}
              setFocusedDate={setFocusedDate}
            />
            {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
          </div>
        </div>

        <div className="border-2 border-yellow-100 rounded-lg absolute top-6 left-6">
          <div className="border border-black border-opacity-40 rounded-lg p-2 w-80 h-96 max-h-96 overflow-hidden flex items-start bg-yellow-100 text-black text-opacity-40">
            <History
              focusedDate={focusedDate}
              setFocusedDate={setFocusedDate}
            />
            {/* <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" /> */}
          </div>
        </div>
      </div>

      {/* Today (the current day) */}
      <div className="md:col-start-4 md:col-span-4 flex items-center">
        <Today isFocused={isTodayFocused} setFocusedDate={setFocusedDate} />
      </div>
    </HomeLayout>
  )
}

export default HomePage
