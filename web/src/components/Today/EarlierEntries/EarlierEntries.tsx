import React, { useEffect, useRef, useState } from 'react'
import Day from 'src/components/Day'
import { useWindowWidth } from 'src/hooks'

export const EarlierEntries: React.FC<{
  isFocused: boolean
  entries: Entry[]
  rest: unknown
}> = ({ isFocused, entries, ...rest }) => {
  // scroll to bottom of <output /> el on new entry
  const earlierEntriesOutputRef = useRef<HTMLOutputElement>()
  useEffect(() => {
    if (earlierEntriesOutputRef.current)
      earlierEntriesOutputRef.current.scrollTop =
        earlierEntriesOutputRef.current?.scrollHeight
  }, [entries])

  // determine whether the section is scrollable (conditionally
  // render UI that indicates scroll, like the bottom gradient)
  const earlierEntriesSectionRef = useRef<HTMLDivElement>()
  const windowWidth = useWindowWidth() // used to execute effect hook on resize
  const [isScrollable, setIsScrollable] = useState(false)
  useEffect(
    () =>
      earlierEntriesSectionRef &&
      earlierEntriesOutputRef &&
      earlierEntriesOutputRef.current &&
      earlierEntriesSectionRef.current &&
      earlierEntriesOutputRef.current.scrollHeight >
        earlierEntriesSectionRef.current.clientHeight
        ? setIsScrollable(true)
        : setIsScrollable(false),
    [entries, earlierEntriesOutputRef, windowWidth]
  )

  // TODO change text opacity of entries & the currentEntry input when earlierEntries is focused (so that the text isn't at half opacity when it's being scrolled)
  return entries ? (
    <section ref={earlierEntriesSectionRef} className="relative" {...rest}>
      <output
        ref={earlierEntriesOutputRef}
        className={`ml-24 flex flex-col text-black ${
          isFocused ? `overflow-auto` : `overflow-hidden text-opacity-50`
        } pb-3`} // bottom padding to make sure descenders (e.g. "g", "y") aren't occluded by the scroll gradient
        css={`
          max-height: 60vh; /* responsiveness */
        `}
      >
        <Day entries={entries} isFocused={isFocused} />
      </output>

      {/* Bottom Gradient (hopefully indicative of the scroll action) */}
      {isScrollable ? (
        <div className="w-full h-7 absolute bottom-0 bg-gradient-to-t from-yellow-100" />
      ) : null}
    </section>
  ) : (
    <div className="pb-7 flex" {...rest}>
      <span className="w-52 pr-5 sm:text-right">Loading...</span>
      <span className="flex-1" />
    </div>
  )
}

export default EarlierEntries
