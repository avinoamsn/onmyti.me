import Entry from 'src/components/Scaffolds/Entry'

export const QUERY = gql`
  query FIND_ENTRY_BY_ID($id: Int!) {
    entry: entry(id: $id) {
      id
      content
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Entry not found</div>

export const Success = ({ entry }) => {
  return <Entry entry={entry} />
}
