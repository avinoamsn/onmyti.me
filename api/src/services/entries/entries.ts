import {
  EntryWhereUniqueInput,
  EntryCreateInput,
  EntryUpdateInput,
} from '@prisma/client'
import { db } from 'src/lib/db'

interface TimeframeArgs {
  input?: { from?: Date | string; to?: Date | string }
}

// TODO the logic for these optional fields doesn't have to be this verbose,
// TODO but prisma wasn't liking min/max dates (when a given field was null)
// TODO so this could probably be improved/may be fixed in a future update
export const entries = ({ input }: TimeframeArgs) => {
  return input?.from && input?.to
    ? db.entry.findMany({
        where: {
          createdAt: {
            gt: new Date(input.from),
            lt: new Date(input.to),
          },
        },
      })
    : input?.from && !input?.to
    ? db.entry.findMany({
        where: {
          createdAt: {
            gt: new Date(input.from),
          },
        },
      })
    : !input?.from && input?.to
    ? db.entry.findMany({
        where: {
          createdAt: {
            lt: new Date(input.to),
          },
        },
      })
    : db.entry.findMany()
}

// interface EntriesWithinTimeframeArgs {
//   input: { from?: Date | string; to?: Date | string }
// }

// export const entriesWithinTimeframe = ({
//   input: { from, to },
// }: EntriesWithinTimeframeArgs) =>
//   db.entry.findMany({
//     where: {
//       createdAt: {
//         gt: new Date(from),
//         lt: new Date(to),
//       },
//     },
//   })

export const entry = ({ id }: EntryWhereUniqueInput) => {
  return db.entry.findOne({
    where: { id },
  })
}

interface CreateEntryArgs {
  input: EntryCreateInput
}

export const createEntry = ({ input }: CreateEntryArgs) => {
  return db.entry.create({
    data: input,
  })
}

interface UpdateEntryArgs extends EntryWhereUniqueInput {
  where: EntryWhereUniqueInput
  input: EntryUpdateInput
}

export const updateEntry = ({ id, input }: UpdateEntryArgs) => {
  return db.entry.update({
    data: input,
    where: { id },
  })
}

export const deleteEntry = ({ id }: EntryWhereUniqueInput) => {
  return db.entry.delete({
    where: { id },
  })
}
