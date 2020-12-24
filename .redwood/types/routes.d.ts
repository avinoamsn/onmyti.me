declare module '@redwoodjs/router' {
  interface AvailableRoutes {
    newEntry: () => '/entries/new'
    editEntry: () => '/entries/{id:Int}/edit'
    entry: () => '/entries/{id:Int}'
    entries: () => '/entries'
    home: () => '/'
  }
}

import type EditEntryPageType from '/Users/avi/onmyti.me/web/src/pages/EditEntryPage/EditEntryPage'
import type EntriesPageType from '/Users/avi/onmyti.me/web/src/pages/EntriesPage/EntriesPage'
import type EntryPageType from '/Users/avi/onmyti.me/web/src/pages/EntryPage/EntryPage'
import type FatalErrorPageType from '/Users/avi/onmyti.me/web/src/pages/FatalErrorPage/FatalErrorPage'
import type HomePageType from '/Users/avi/onmyti.me/web/src/pages/HomePage/HomePage'
import type NewEntryPageType from '/Users/avi/onmyti.me/web/src/pages/NewEntryPage/NewEntryPage'
import type NotFoundPageType from '/Users/avi/onmyti.me/web/src/pages/NotFoundPage/NotFoundPage'
declare global {
  const EditEntryPage: typeof EditEntryPageType
  const EntriesPage: typeof EntriesPageType
  const EntryPage: typeof EntryPageType
  const FatalErrorPage: typeof FatalErrorPageType
  const HomePage: typeof HomePageType
  const NewEntryPage: typeof NewEntryPageType
  const NotFoundPage: typeof NotFoundPageType
}
