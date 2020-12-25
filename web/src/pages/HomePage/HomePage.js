import { useEffect } from 'react'
import { addDays, isToday, formatISO } from 'date-fns'
import _ from 'lodash'

import HomeLayout from 'src/layouts/HomeLayout'
import Today from 'src/components/Today'
import { usePersistentState, useScrollDirection } from 'src/hooks'

const HomePage = () => {
  const scrollDir = useScrollDirection()
  const [focusedDate, setFocusedDate] = usePersistentState(
    `focusedDate`,
    formatISO(new Date())
  )

  // capture wheel (scroll) interaction
  useEffect(() => {
    const onScroll = _.debounce(
      () =>
        scrollDir === 'up'
          ? setFocusedDate(addDays(focusedDate, 1))
          : setFocusedDate(addDays(focusedDate, -1)),
      150
    )
    window.addEventListener('wheel', onScroll)

    const onArrowPress = (e) => {
      if (e.code === 'ArrowUp') setFocusedDate(addDays(focusedDate, 1))
      if (e.code === 'ArrowDown') setFocusedDate(addDays(focusedDate, -1))
    }
    window.addEventListener('keydown', onArrowPress)

    // rm subscriptions (avoid mem leak)
    return () => {
      window.removeEventListener('wheel', onScroll)
      window.removeEventListener('keydown', onArrowPress)
    }
  })

  return (
    <HomeLayout>
      <Today isFocused={isToday(focusedDate)} />
    </HomeLayout>
  )
}

export default HomePage
