import { useEffect } from 'react'
import { disableBodyScroll } from 'body-scroll-lock'

export const HomeLayout = ({ children }) => {
  // disable scrolling on the container
  useEffect(() => disableBodyScroll(document.querySelector('#container')), [])

  return (
    <div
      id="container"
      className="w-screen h-screen px-4 grid grid-cols-1 md:grid-cols-10 bg-yellow-100"
    >
      {children}
    </div>
  )
}
