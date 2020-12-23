import EntriesLayout from 'src/layouts/EntriesLayout'
import EntryCell from 'src/components/EntryCell'

const EntryPage = ({ id }) => {
  return (
    <EntriesLayout>
      <EntryCell id={id} />
    </EntriesLayout>
  )
}

export default EntryPage
