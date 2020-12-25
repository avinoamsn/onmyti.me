import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      {/* Entries Scaffold Pages */}
      <Route path="/entries/new" page={NewEntryPage} name="newEntry" />
      <Route
        path="/entries/{id:Int}/edit"
        page={EditEntryPage}
        name="editEntry"
      />
      <Route path="/entries/{id:Int}" page={EntryPage} name="entry" />
      <Route path="/entries" page={EntriesPage} name="entries" />

      {/* Main Pages */}
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
