import { isToday } from 'date-fns'

import HomeLayout from 'src/layouts/HomeLayout'
import Today from 'src/components/Today'
import { usePersistentState } from 'src/hooks'

const HomePage = () => {
  const [focusedDate, setFocusedDate] = usePersistentState(
    `focusedDate`,
    new Date()
  )

  console.log(isToday(focusedDate))

  return (
    <HomeLayout>
      <Today isFocused={isToday(focusedDate)} />
    </HomeLayout>
  )
}

export default HomePage
