import EntriesLayout from 'src/layouts/EntriesLayout'
import EntryCell from 'src/components/EntryScaffold/EntryCell'

const EntryPage = ({ id }) => {
  return (
    <EntriesLayout>
      <EntryCell id={id} />
    </EntriesLayout>
  )
}

export default EntryPage
