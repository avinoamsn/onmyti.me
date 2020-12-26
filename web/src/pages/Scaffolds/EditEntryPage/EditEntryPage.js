import EntriesLayout from 'src/layouts/Scaffolds/EntriesLayout'
import EditEntryCell from 'src/components/Scaffolds/EditEntryCell'

const EditEntryPage = ({ id }) => {
  return (
    <EntriesLayout>
      <EditEntryCell id={id} />
    </EntriesLayout>
  )
}

export default EditEntryPage
