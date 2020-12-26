import {
  EntryWhereUniqueInput,
  EntryCreateInput,
  EntryUpdateInput,
} from '@prisma/client'
import { db } from 'src/lib/db'

export const entries = () => {
  return db.entry.findMany()
}

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

interface UpdateEntryArgs {
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
