import { useEffect, useState } from 'react'
import { addDays, isToday, startOfToday, formatISO } from 'date-fns'
import _ from 'lodash'

import HomeLayout from 'src/layouts/HomeLayout'
import Today from 'src/components/Today'
import { usePersistentState, useScrollDirection } from 'src/hooks'

const HomePage = () => {
  const scrollDir = useScrollDirection()
  const [focusedDate, setFocusedDate] = usePersistentState(
    `focusedDate`,
    formatISO(startOfToday())
  )
  const [isTodayFocused, setIsTodayFocused] = useState(isToday(focusedDate))

  useEffect(
    () =>
      isToday(focusedDate) ? setIsTodayFocused(true) : setIsTodayFocused(false),
    [focusedDate]
  )

  // capture wheel (scroll) & arrow key (up/down) interaction
  useEffect(() => {
    const onArrowPress = (e) => {
      if (e.code === 'ArrowUp') setFocusedDate(addDays(focusedDate, 1))
      if (e.code === 'ArrowDown') setFocusedDate(addDays(focusedDate, -1))
    }
    window.addEventListener('keydown', onArrowPress)

    // rm subscriptions (avoid mem leak)
    return () => {
      window.removeEventListener('keydown', onArrowPress)
    }
  })

  return (
    <HomeLayout>
      <Today isFocused={isTodayFocused} setFocusedDate={setFocusedDate} />
    </HomeLayout>
  )
}

export default HomePage
