import { css } from 'styled-components'

export const Today: React.FC<{ isFocused: boolean }> = ({ isFocused }) => (
  <div
    className={`transition-transform ${isFocused ? `` : `opacity-50`}`}
    css={
      isFocused
        ? css``
        : css`
            transform: translateY(100px);
          `
    }
  >
    <h2>Today</h2>
    <p>Scroll me to focus/unfocus!</p>
  </div>
)
