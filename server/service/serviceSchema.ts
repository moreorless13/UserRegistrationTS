import { gql } from 'apollo-server-express';

export const ServiceTypeDefs = gql`
    scalar Date
    scalar ObjectId

    type User {
        _id: ID
        username: String!
        email: String!
        password: String!
        accountStatus: String
        role: String
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        user: User
        users: [User]
        verifyUser(userId: ID!): User
    }

    type Mutation {
        addUser(username: String!, email: String!, password: String!): Auth
        login(username: String!, password: String!): Auth
        removeUser(username: String!, email: String!, password: String!): User
    }
`