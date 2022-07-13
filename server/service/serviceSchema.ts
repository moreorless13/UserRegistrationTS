import { gql } from 'apollo-server-express';

export const ServiceTypeDefs = gql`
    type User {
        username: String!
        email: String!
        password: String!
    }

    type Query {
        getAllUsers: [User]
    }
`