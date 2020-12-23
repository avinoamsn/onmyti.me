import EntriesLayout from 'src/layouts/EntriesLayout'
import EditEntryCell from 'src/components/EditEntryCell'

const EditEntryPage = ({ id }) => {
  return (
    <EntriesLayout>
      <EditEntryCell id={id} />
    </EntriesLayout>
  )
}

export default EditEntryPage
