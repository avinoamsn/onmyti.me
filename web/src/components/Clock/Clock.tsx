import { format } from 'date-fns'
import { useEffect, useState } from 'react'

export const Clock: React.FunctionComponent = () => {
  const [time, setTime] = useState(new Date())

  // update every second (and unsubscribe on unmount)
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000)

    return () => clearInterval(timer)
  }, [])

  return <span className="w-36 text-3xl">{format(time, `HH:mm:ss`)}</span>
}

export default Clock
