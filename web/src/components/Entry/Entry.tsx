import { useEffect } from 'react'

import { returnSVG } from 'src/assets'
import { usePersistentState } from 'src/hooks'

export const Entry: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  const [entryText, setEntryText] = usePersistentState(`entryText`, ``)

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
        rows={1}
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
    </form>
  )
}

export default Entry
