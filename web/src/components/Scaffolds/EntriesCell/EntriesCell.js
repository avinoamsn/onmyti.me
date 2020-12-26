import { Link, routes } from '@redwoodjs/router'

import Entries from 'src/components/Scaffolds/Entries'

export const QUERY = gql`
  query ENTRIES {
    entries {
      id
      content
      createdAt
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => {
  return (
    <div className="rw-text-center">
      {'No entries yet. '}
      <Link to={routes.scaffoldsNewEntry()} className="rw-link">
        {'Create one?'}
      </Link>
    </div>
  )
}

export const Success = ({ entries }) => {
  return <Entries entries={entries} />
}
