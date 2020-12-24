export const Today: React.FC<{ isFocused: boolean }> = ({ isFocused }) => (
  <div>
    <h2>{'Today'}</h2>
    <p>test{console.log(isFocused)}</p>
  </div>
)
