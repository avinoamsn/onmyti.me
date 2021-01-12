declare module '@redwoodjs/router' {
  interface AvailableRoutes {
    scaffoldsNewEntry: () => '/scaffolds/entries/new'
    scaffoldsEditEntry: () => '/scaffolds/entries/{id:Int}/edit'
    scaffoldsEntry: () => '/scaffolds/entries/{id:Int}'
    scaffoldsEntries: () => '/scaffolds/entries'
    home: () => '/'
  }
}

import type FatalErrorPageType from '/home/avi/onmyti.me/web/src/pages/FatalErrorPage/FatalErrorPage'
import type HomePageType from '/home/avi/onmyti.me/web/src/pages/HomePage/HomePage'
import type NotFoundPageType from '/home/avi/onmyti.me/web/src/pages/NotFoundPage/NotFoundPage'
import type ScaffoldsEditEntryPageType from '/home/avi/onmyti.me/web/src/pages/Scaffolds/EditEntryPage/EditEntryPage'
import type ScaffoldsEntriesPageType from '/home/avi/onmyti.me/web/src/pages/Scaffolds/EntriesPage/EntriesPage'
import type ScaffoldsEntryPageType from '/home/avi/onmyti.me/web/src/pages/Scaffolds/EntryPage/EntryPage'
import type ScaffoldsNewEntryPageType from '/home/avi/onmyti.me/web/src/pages/Scaffolds/NewEntryPage/NewEntryPage'
declare global {
  const FatalErrorPage: typeof FatalErrorPageType
  const HomePage: typeof HomePageType
  const NotFoundPage: typeof NotFoundPageType
  const ScaffoldsEditEntryPage: typeof ScaffoldsEditEntryPageType
  const ScaffoldsEntriesPage: typeof ScaffoldsEntriesPageType
  const ScaffoldsEntryPage: typeof ScaffoldsEntryPageType
  const ScaffoldsNewEntryPage: typeof ScaffoldsNewEntryPageType
}
