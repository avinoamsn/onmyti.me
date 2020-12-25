export const Today: React.FC<{ isFocused: boolean }> = ({ isFocused }) => (
  <div
    className={`transition-transform transform-gpu ${
      isFocused ? `` : `translate-y-40 opacity-50`
    }`}
  >
    <h2>Today</h2>
    <p>Scroll me to focus/unfocus!</p>
  </div>
)
