import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import EntryForm from 'src/components/EntryForm'

export const QUERY = gql`
  query FIND_ENTRY_BY_ID($id: Int!) {
    entry: entry(id: $id) {
      id
      content
      createdAt
    }
  }
`
const UPDATE_ENTRY_MUTATION = gql`
  mutation UpdateEntryMutation($id: Int!, $input: UpdateEntryInput!) {
    updateEntry(id: $id, input: $input) {
      id
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Success = ({ entry }) => {
  const { addMessage } = useFlash()
  const [updateEntry, { loading, error }] = useMutation(UPDATE_ENTRY_MUTATION, {
    onCompleted: () => {
      navigate(routes.entries())
      addMessage('Entry updated.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input, id) => {
    updateEntry({ variables: { id, input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">
          Edit Entry {entry.id}
        </h2>
      </header>
      <div className="rw-segment-main">
        <EntryForm
          entry={entry}
          onSave={onSave}
          error={error}
          loading={loading}
        />
      </div>
    </div>
  )
}
