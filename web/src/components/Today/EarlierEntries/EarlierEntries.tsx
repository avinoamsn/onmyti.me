import { format } from 'date-fns'
import { useEffect, useRef, useState } from 'react'
import useWindowWidth from 'src/hooks/useWindowWidth'

export const EarlierEntries: React.FC<{
  entries: Entry[]
  isFocused: boolean
}> = ({ entries, isFocused }) => {
  // determine whether the section is scrollable (conditionally
  // render UI that indicates scroll, like the bottom gradient)
  const earlierEntriesSectionRef = useRef<HTMLDivElement>()
  const earlierEntriesOutputRef = useRef<HTMLOutputElement>()
  const windowWidth = useWindowWidth() // used to execute effect hook on resize
  const [isScrollable, setIsScrollable] = useState(false)
  useEffect(
    () =>
      earlierEntriesSectionRef &&
      earlierEntriesOutputRef &&
      earlierEntriesOutputRef.current.scrollHeight >
        earlierEntriesSectionRef.current.clientHeight
        ? setIsScrollable(true)
        : setIsScrollable(false),
    [windowWidth]
  )

  return (
    <section ref={earlierEntriesSectionRef} className="relative">
      <output
        ref={earlierEntriesOutputRef}
        className="max-w-xl overflow-scroll flex flex-col"
        css={`
          max-height: 60vh;
        `}
      >
        {entries.map((e) => (
          <div
            key={e.id} // TODO unique keys across every array on HomePage
            className="flex flex-col sm:flex-row"
          >
            {/* Entry Date */}
            <time className="w-40 pr-5 sm:text-right">
              {format(new Date(e.createdAt), `pp`)}
            </time>

            {/* Entry Content */}
            <p
              className={`w-96 pb-4 font-sans font-light bg-transparent transition-all ${
                isFocused ? `opacity-50` : ``
              }`}
              css={`
                max-width: 85vw; /* responsiveness */
              `}
            >
              {e.content}
            </p>
          </div>
        ))}
      </output>

      {/* Bottom Gradient (hopefully indicative of the scroll action) */}
      {isScrollable ? (
        <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" />
      ) : null}
    </section>
  )
}

export default EarlierEntries
