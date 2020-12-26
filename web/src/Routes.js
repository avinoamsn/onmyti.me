import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route
        path="/scaffolds/entries/new"
        page={ScaffoldsNewEntryPage}
        name="scaffoldsNewEntry"
      />
      <Route
        path="/scaffolds/entries/{id:Int}/edit"
        page={ScaffoldsEditEntryPage}
        name="scaffoldsEditEntry"
      />
      <Route
        path="/scaffolds/entries/{id:Int}"
        page={ScaffoldsEntryPage}
        name="scaffoldsEntry"
      />
      <Route
        path="/scaffolds/entries"
        page={ScaffoldsEntriesPage}
        name="scaffoldsEntries"
      />
      {/* Entries Scaffold Pages */}

      {/* Main Pages */}
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
