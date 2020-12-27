import { useEffect, useState } from 'react'

// import { returnSVG } from 'src/assets'
import { usePersistentState, useTextWidth } from 'src/hooks'
import { Clock } from '../Clock/Clock'

const TEXTAREA_WIDTH = document.getElementById('current-entry-input')
  ?.clientWidth // ? in px, for wordwrap logic

export const Entry: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const [entryText, setEntryText] = usePersistentState(`entryText`, ``)
  const textWidth = useTextWidth(entryText, `18px Roboto`)

  // numLines – re-calculated every time the input value changes
  const [numLines, setNumLines] = useState(1)
  useEffect(() => setNumLines(Math.ceil(textWidth / TEXTAREA_WIDTH) || 1), [
    entryText,
    textWidth,
  ])

  // re-focus input when `Today` is focused (autoFocus only covers page load)
  useEffect(() => {
    if (isFocused) document.getElementById('current-entry-input').focus()
  }, [isFocused])

  return (
    <section className="flex flex-col sm:flex-row">
      <Clock />

      <form id="current-entry" className="flex flex-col">
        <textarea
          id="current-entry-input"
          name="entry-content"
          placeholder={
            isFocused ? `start typing...` : `click here to start a new entry`
          }
          value={entryText}
          onChange={(e) => setEntryText(e.target.value)}
          rows={numLines}
          cols={50}
          wrap="hard"
          autoFocus
          spellCheck
          disabled={isFocused ? false : true}
          className={`resize-none pb-1 border-b border-black focus:outline-none mb-2 font-sans font-light bg-transparent transition-all placeholder-black ${
            isFocused ? `placeholder-opacity-50` : ``
          }`}
          css={`
            max-width: 90vw; /* responsive on small (mobile) devices */
          `}
        />

        <label htmlFor="current-entry-input">
          return &crarr; to save your note
        </label>

        {/* used to calculate the width (and textwrap) for the textarea above */}
        <div
          id="current-entry-input-width"
          className="absolute hidden whitespace-nowrap"
        >
          {entryText}
        </div>
      </form>
    </section>
  )
}

export default Entry
