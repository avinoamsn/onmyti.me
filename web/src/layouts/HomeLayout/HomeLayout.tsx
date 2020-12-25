import { useEffect } from 'react'
import { disableBodyScroll } from 'body-scroll-lock'

export const HomeLayout = ({ children }) => {
  // disable scrolling on the container
  useEffect(() => disableBodyScroll(document.querySelector('#container')), [])

  return (
    <div
      id="container"
      className="w-screen h-screen flex justify-around items-center bg-yellow-100"
    >
      {children}
    </div>
  )
}
