import EntriesLayout from 'src/layouts/Scaffolds/EntriesLayout'
import EntryCell from 'src/components/Scaffolds/EntryCell'

const EntryPage = ({ id }) => {
  return (
    <EntriesLayout>
      <EntryCell id={id} />
    </EntriesLayout>
  )
}

export default EntryPage
