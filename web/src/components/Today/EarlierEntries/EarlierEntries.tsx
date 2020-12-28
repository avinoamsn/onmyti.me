export const EarlierEntries: React.FC<{
  entries: Entry[]
  isFocused: boolean
}> = ({ entries, isFocused }) => (
  <output className="flex flex-col">
    {entries.map((e) => (
      <textarea
        key={e.id} // TODO unique keys across every array on HomePage
        value={e.content}
        cols={45}
        wrap="hard"
        disabled
        className={`pb-1 mb-2 font-sans font-light bg-transparent transition-all ${
          isFocused ? `opacity-50` : ``
        }`}
        css={`
          max-width: 85vw; /* responsive on small (mobile) devices */
        `}
      />
    ))}
  </output>
)

export default EarlierEntries
