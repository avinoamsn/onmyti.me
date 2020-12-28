export const EarlierEntries: React.FC<{ entries: Entry[] }> = ({ entries }) => (
  <section>
    {entries.map((e) => (
      <textarea
        key={e.id} // TODO unique keys across every array on HomePage
        value={e.content}
        cols={45}
        wrap="hard"
        disabled
        className="resize-none pb-1 border-b border-black focus:outline-none mb-2 font-sans font-light bg-transparent oapcity-50 transition-all"
        css={`
          max-width: 85vw; /* responsive on small (mobile) devices */
        `}
      />
    ))}
  </section>
)

export default EarlierEntries
