import { useEffect } from 'react'

export const Entry: React.FC<{ isFocused: boolean }> = ({ isFocused }) => {
  useEffect(() => {
    if (isFocused) document.getElementById('current-entry-input').focus()
  }, [isFocused])

  return (
    <section id="current-entry" className="flex flex-col">
      <textarea
        id="current-entry-input"
        name="entry"
        placeholder={
          isFocused ? `start typing...` : `click here to start a new entry`
        }
        rows={1}
        cols={50}
        wrap="hard"
        autoFocus
        spellCheck
        disabled={isFocused ? false : true}
        className={`resize-none pb-1 focus:outline-none border-b border-black mb-2 font-light bg-transparent placeholder-black ${
          isFocused ? `placeholder-opacity-50` : ``
        }`}
      ></textarea>

      <label htmlFor="current-entry-input">
        return &crarr; to save your note
      </label>
    </section>
  )
}

export default Entry
