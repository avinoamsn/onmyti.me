import { db } from 'src/lib/db'

export const entries = () => {
  return db.entry.findMany()
}

export const entry = ({ id }) => {
  return db.entry.findOne({
    where: { id },
  })
}

export const createEntry = ({ input }) => {
  return db.entry.create({
    data: input,
  })
}

export const updateEntry = ({ id, input }) => {
  return db.entry.update({
    data: input,
    where: { id },
  })
}

export const deleteEntry = ({ id }) => {
  return db.entry.delete({
    where: { id },
  })
}
