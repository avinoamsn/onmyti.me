import { useEffect } from 'react'
import { addDays, isToday } from 'date-fns'
import _ from 'lodash'

import HomeLayout from 'src/layouts/HomeLayout'
import Today from 'src/components/Today'
import { usePersistentState } from 'src/hooks'
import { useScrollDirection } from '../../hooks/useScrollDirection'

const HomePage = () => {
  const scrollDir = useScrollDirection()
  const [focusedDate, setFocusedDate] = usePersistentState(
    `focusedDate`,
    new Date()
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

    return () => window.removeEventListener('wheel', onScroll)
  })

  return (
    <HomeLayout>
      <Today isFocused={isToday(focusedDate)} />
    </HomeLayout>
  )
}

export default HomePage
