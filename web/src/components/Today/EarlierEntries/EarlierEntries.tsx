import { format } from 'date-fns'

export const EarlierEntries: React.FC<{
  entries: Entry[]
  isFocused: boolean
}> = ({ entries, isFocused }) => (
  <output className="max-w-xl flex flex-col">
    {entries.map((e) => (
      <div
        key={e.id} // TODO unique keys across every array on HomePage
        className="flex flex-col sm:flex-row"
      >
        <time className="w-40 pr-5 text-right">
          {format(new Date(e.createdAt), `pp`)}
        </time>

        <p
          className={`w-96 pb-4 font-sans font-light bg-transparent transition-all ${
            isFocused ? `opacity-50` : ``
          }`}
          css={`
            max-width: 85vw; /* responsive on small (mobile) devices */
          `}
        >
          {e.content}
        </p>
      </div>
    ))}
  </output>
)

export default EarlierEntries
