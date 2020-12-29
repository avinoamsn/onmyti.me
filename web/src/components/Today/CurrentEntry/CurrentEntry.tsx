import { createRef, useEffect, useState } from 'react'
import Clock from 'src/components/Today/Clock'
// import { returnSVG } from 'src/assets' // ! SVG to use for return symbol
import { usePersistentState, useTextWidth } from 'src/hooks'

import { useMutation } from '@redwoodjs/web'
import { useWindowWidth } from '../../../hooks/useWindowWidth'

const CREATE_ENTRY_MUTATION = gql`
  mutation CreateEntryMutation($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
    }
  }
`

export const CurrentEntry: React.FC<{ isFocused: boolean }> = ({
  isFocused,
}) => {
  const [content, setContent] = usePersistentState(`content`, ``)

  // text wrap logic (uses invisible element to calculate)
  const textWidth = useTextWidth(content, `18px Roboto`)
  const textAreaRef = createRef<HTMLTextAreaElement>()
  const [textAreaWidth, setTextAreaWidth] = useState<number>()
  const windowWidth = useWindowWidth()
  useEffect(() => {
    if (textAreaRef.current) setTextAreaWidth(textAreaRef.current.clientWidth)
  }, [textAreaRef, windowWidth])

  // save entry mutation
  const [createEntry] = useMutation(CREATE_ENTRY_MUTATION, {
    onCompleted: () => setContent(``), // reset entry content
  })
  const onSave = (e) => {
    if (e.code === `Enter`) {
      e.preventDefault()
      createEntry({
        variables: { input: { content } },
      })
    }
  }

  // submit on return/enter (if content insn't empty)
  useEffect(() => {
    window.addEventListener('keydown', onSave)
    return () => window.removeEventListener('keydown', onSave)
  })

  // numLines – re-calculated every time the input value changes
  const [numLines, setNumLines] = useState(1)
  useEffect(() => setNumLines(Math.ceil(textWidth / textAreaWidth) || 1), [
    content,
    textAreaWidth,
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
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={numLines}
          wrap="hard"
          autoFocus
          spellCheck
          disabled={isFocused ? false : true}
          ref={textAreaRef}
          className={`resize-none w-96 pb-1 border-b border-black focus:outline-none mb-2 font-sans font-light bg-transparent transition-all placeholder-black ${
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
          {content}
        </div>
      </form>
    </section>
  )
}

export default CurrentEntry
