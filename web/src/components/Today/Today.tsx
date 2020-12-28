import { startOfToday } from 'date-fns'
import { Dispatch } from 'react'

import CurrentEntry from './CurrentEntry'
import EarlierEntries from './EarlierEntries'

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
    <EarlierEntries />

    <CurrentEntry isFocused={isFocused} />

    {/* Anchor cover so that Today component is clickable when it isn't focused */}
    {!isFocused ? (
      <a
        className="absolute top-0 w-full h-full cursor-pointer"
        onClick={() => (isFocused ? null : setFocusedDate(startOfToday()))}
      />
    ) : null}
  </div>
)
