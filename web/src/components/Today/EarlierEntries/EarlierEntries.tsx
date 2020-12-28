export const QUERY = gql`
  query ENTRIES {
    entries {
      id
      content
      createdAt
    }
  }
`

export const EarlierEntries: React.FunctionComponent = () => {
  return (
    <div>
      <h2>{'EarlierEntries'}</h2>
      <p>
        {'Find me in ./web/src/components/EarlierEntries/EarlierEntries.tsx'}
      </p>
    </div>
  )
}

export default EarlierEntries
