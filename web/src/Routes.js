// In this file, all Page components from 'src/pages` are auto-imported. Nested
// directories are supported, and should be uppercase. Each subdirectory will be
// prepended onto the component name.
//
// Examples:
//
// 'src/pages/HomePage/HomePage.js'         -> HomePage
// 'src/pages/Admin/BooksPage/BooksPage.js' -> AdminBooksPage

import { Router, Route } from '@redwoodjs/router'

const Routes = () => {
  return (
    <Router>
      <Route path="/entries/new" page={NewEntryPage} name="newEntry" />
      <Route
        path="/entries/{id:Int}/edit"
        page={EditEntryPage}
        name="editEntry"
      />
      <Route path="/entries/{id:Int}" page={EntryPage} name="entry" />
      <Route path="/entries" page={EntriesPage} name="entries" />
      <Route path="/" page={HomePage} name="home" />
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
