export const schema = gql`
  type Entry {
    id: Int!
    content: String!
    createdAt: DateTime!
  }

  type Query {
    entries: [Entry!]!
    entry(id: Int!): Entry!
  }

  input CreateEntryInput {
    content: String!
  }

  input UpdateEntryInput {
    content: String
  }

  type Mutation {
    createEntry(input: CreateEntryInput!): Entry!
    updateEntry(id: Int!, input: UpdateEntryInput!): Entry!
    deleteEntry(id: Int!): Entry!
  }
`
