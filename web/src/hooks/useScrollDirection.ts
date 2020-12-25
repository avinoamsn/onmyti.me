import { useEffect, useState } from 'react'

const SCROLL_UP = 'up'
const SCROLL_DOWN = 'down'
const SCROLL_UNSET = ''

export const useScrollDirection = ():
  | typeof SCROLL_UP
  | typeof SCROLL_DOWN
  | typeof SCROLL_UNSET => {
  const [scrollDir, setScrollDir] = useState<
    typeof SCROLL_UP | typeof SCROLL_DOWN | typeof SCROLL_UNSET
  >(SCROLL_UNSET)

  useEffect(() => {
    const onScroll = (e: WheelEvent) => {
      if (e.deltaY < 0) setScrollDir(SCROLL_UP)
      else if (e.deltaY > 0) setScrollDir(SCROLL_DOWN)
    }
    window.addEventListener('wheel', onScroll)

    return () => window.removeEventListener('wheel', onScroll)
  }, [scrollDir])

  return scrollDir
}
