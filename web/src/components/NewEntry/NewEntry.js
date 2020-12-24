import { useMutation, useFlash } from '@redwoodjs/web'
import { navigate, routes } from '@redwoodjs/router'
import EntryForm from 'src/components/EntryForm'

import { QUERY } from 'src/components/EntriesCell'

const CREATE_ENTRY_MUTATION = gql`
  mutation CreateEntryMutation($input: CreateEntryInput!) {
    createEntry(input: $input) {
      id
    }
  }
`

const NewEntry = () => {
  const { addMessage } = useFlash()
  const [createEntry, { loading, error }] = useMutation(CREATE_ENTRY_MUTATION, {
    onCompleted: () => {
      navigate(routes.entries())
      addMessage('Entry created.', { classes: 'rw-flash-success' })
    },
  })

  const onSave = (input) => {
    createEntry({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New Entry</h2>
      </header>
      <div className="rw-segment-main">
        <EntryForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewEntry
