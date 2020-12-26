import EntriesLayout from 'src/layouts/EntriesLayout'
import EditEntryCell from 'src/components/EntryScaffold/EditEntryCell'

const EditEntryPage = ({ id }) => {
  return (
    <EntriesLayout>
      <EditEntryCell id={id} />
    </EntriesLayout>
  )
}

export default EditEntryPage
