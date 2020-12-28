import { startOfToday } from 'date-fns'

import CurrentEntry from './CurrentEntry'
import EarlierEntriesCell from './EarlierEntriesCell'

export const Today = ({ isFocused, setFocusedDate }) => (
  <div
    id="today"
    className={`relative transition-all transform-gpu ${
      isFocused ? `` : `translate-y-40 opacity-50`
    }`}
  >
    <EarlierEntriesCell isFocused={isFocused} />
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

export default Today
