import { format } from 'date-fns'
import { clockFormat } from 'src/globals'

export const Day: React.FC<{
  entries: Entry[]
  isFocused: boolean
}> = ({ entries, isFocused }) => (
  <>
    {entries.map((e) => (
      <div
        key={e.id} // TODO unique keys across every array on HomePage
        className="flex flex-col sm:flex-row"
      >
        {/* Entry Date */}
        <time className="w-28 pr-5 sm:text-right">
          {format(new Date(e.createdAt), clockFormat)}
        </time>

        {/* Entry Content */}
        <p
          className={`flex-1 pb-4 font-sans font-light bg-transparent transition-all ${
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
  </>
)

export default Day
