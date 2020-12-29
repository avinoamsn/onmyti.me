import { useState, useEffect } from 'react'

const getWidth = () =>
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth

/**
 * @see https://dev.to/vitaliemaldur/resize-event-listener-using-react-hooks-1k0c
 */
export const useWindowWidth = () => {
  // save current window width in the state object
  const [width, setWidth] = useState(getWidth())

  // in this case useEffect will execute only once because
  // it does not have any dependencies.
  useEffect(() => {
    const resizeListener = () => {
      // change width from the state object
      setWidth(getWidth())
    }
    // set resize listener
    window.addEventListener('resize', resizeListener)

    // clean up function
    return () => {
      // remove resize listener
      window.removeEventListener('resize', resizeListener)
    }
  }, [])

  return width
}

export default useWindowWidth
