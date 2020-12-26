import { useMutation, useFlash } from '@redwoodjs/web'
import { Link, routes, navigate } from '@redwoodjs/router'

import { QUERY } from 'src/components/Scaffolds/EntriesCell'

const DELETE_ENTRY_MUTATION = gql`
  mutation DeleteEntryMutation($id: Int!) {
    deleteEntry(id: $id) {
      id
    }
  }
`

const jsonDisplay = (obj) => {
  return (
    <pre>
      <code>{JSON.stringify(obj, null, 2)}</code>
    </pre>
  )
}

const timeTag = (datetime) => {
  return (
    <time dateTime={datetime} title={datetime}>
      {new Date(datetime).toUTCString()}
    </time>
  )
}

const checkboxInputTag = (checked) => {
  return <input type="checkbox" checked={checked} disabled />
}

const Entry = ({ entry }) => {
  const { addMessage } = useFlash()
  const [deleteEntry] = useMutation(DELETE_ENTRY_MUTATION, {
    onCompleted: () => {
      navigate(routes.scaffoldsEntries())
      addMessage('Entry deleted.', { classes: 'rw-flash-success' })
    },
  })

  const onDeleteClick = (id) => {
    if (confirm('Are you sure you want to delete entry ' + id + '?')) {
      deleteEntry({ variables: { id } })
    }
  }

  return (
    <>
      <div className="rw-segment">
        <header className="rw-segment-header">
          <h2 className="rw-heading rw-heading-secondary">
            Entry {entry.id} Detail
          </h2>
        </header>
        <table className="rw-table">
          <tbody>
            <tr>
              <th>Id</th>
              <td>{entry.id}</td>
            </tr>
            <tr>
              <th>Content</th>
              <td>{entry.content}</td>
            </tr>
            <tr>
              <th>Created at</th>
              <td>{timeTag(entry.createdAt)}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <nav className="rw-button-group">
        <Link
          to={routes.scaffoldsEditEntry({ id: entry.id })}
          className="rw-button rw-button-blue"
        >
          Edit
        </Link>
        <a
          href="#"
          className="rw-button rw-button-red"
          onClick={() => onDeleteClick(entry.id)}
        >
          Delete
        </a>
      </nav>
    </>
  )
}

export default Entry
