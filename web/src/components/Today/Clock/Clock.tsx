import { format } from 'date-fns'
import { useEffect, useState } from 'react'
import { clockFormat } from 'src/globals/clockFormat'

export const Clock: React.FunctionComponent = () => {
  const [time, setTime] = useState(new Date())

  // update every second (and unsubscribe on unmount)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <span className="w-52 pr-5 text-3xl sm:text-right whitespace-nowrap">
      {format(time, clockFormat)}
    </span>
  )
}

export default Clock
