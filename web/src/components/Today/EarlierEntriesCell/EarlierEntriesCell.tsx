import EarlierEntries from 'src/components/Today/EarlierEntries'

// export const QUERY = gql`
//   query CurrentDayEntries($input: TimeframeInput) {
//     entries(input: $input) {
//       id
//       content
//       createdAt
//     }
//   }
// `

export const QUERY = gql`
  query CurrentDayEntries {
    entries {
      id
      content
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }) => <div>Error: {error.message}</div>

export const Success = (data) => {
  console.log(data)
  return null
  // return <EarlierEntries entries={entries} />
}
