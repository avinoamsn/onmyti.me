import { Dispatch, SetStateAction, useEffect, useState } from 'react'

// import { returnSVG } from 'src/assets'
import { usePersistentState } from 'src/hooks'

/**
 * TODO improve this logic to be more declarative
 *
 * Uses canvas.measureText to compute and return the width of the given text of given font in pixels.
 *
 * @param {String} text The text to be rendered.
 * @param {String} font The css font descriptor that text is to be rendered with (e.g. "bold 14px verdana").
 *
 * @see https://stackoverflow.com/a/21015393/5425359
 */
function getTextWidth(text) {
  // re-use canvas object for better performance
  const canvas =
    (getTextWidth as any).canvas ||
    ((getTextWidth as any).canvas = document.createElement('canvas'))
  const context = canvas.getContext('2d')
  // context.font = font
  const metrics = context.measureText(text)
  console.log(metrics)
  return metrics.width
}

export const Entry: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const [entryText, setEntryText] = usePersistentState(`entryText`, ``)

  // numLines – re-calculated every time the input value changes
  const [numLines, setNumLines] = useState(1)
  useEffect(() => setNumLines(Math.ceil(getTextWidth(entryText) / 239) || 1), [
    entryText,
  ])

  console.log(numLines)

  // re-focus input when `Today` is focused (autoFocus only covers page load)
  useEffect(() => {
    if (isFocused) document.getElementById('current-entry-input').focus()
  }, [isFocused])

  return (
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
        className={`resize-none pb-1 border-b border-black focus:outline-none mb-2 font-light bg-transparent transition-all placeholder-black ${
          isFocused ? `placeholder-opacity-50` : ``
        }`}
      ></textarea>

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
  )
}

export default Entry
