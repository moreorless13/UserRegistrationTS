"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServiceTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.ServiceTypeDefs = (0, apollo_server_express_1.gql) `
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
        updatePassword(userId: ID!, oldPassword: String!, newPassword: String!, confirmationPassword: String!): User
        forgotPassword(email: String!): User
        changeUserAccountStatus(userId: ID!, accountStatus: String!): User
    }
`;
