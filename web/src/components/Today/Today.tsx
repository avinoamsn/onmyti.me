import { startOfToday } from 'date-fns'
import { Dispatch } from 'react'
import Entry from 'src/components/Entry'

export const Today: React.FC<{
  isFocused: boolean
  setFocusedDate: Dispatch<Date>
}> = ({ isFocused, setFocusedDate }) => (
  <div
    id="today"
    className={`relative transition-transform transform-gpu ${
      isFocused ? `` : `translate-y-40 opacity-50`
    }`}
  >
    <Entry isFocused={isFocused} />
    {!isFocused ? (
      <a
        className="absolute top-0 w-full h-full cursor-pointer"
        onClick={() => (isFocused ? null : setFocusedDate(startOfToday()))}
      />
    ) : null}
  </div>
)
