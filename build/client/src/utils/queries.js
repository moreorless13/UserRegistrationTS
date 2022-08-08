"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VERIFY_USER = exports.QUERY_ME = exports.QUERY_USER = exports.QUERY_USERS = void 0;
const client_1 = require("@apollo/client");
exports.QUERY_USERS = (0, client_1.gql) `
    query users {
        users {
            _id
            username
            email
            accountStatus
            role
        }
    }
`;
exports.QUERY_USER = (0, client_1.gql) `
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
            accountStatus
            role
        }
    }
`;
exports.QUERY_ME = (0, client_1.gql) `
    {
        me {
            _id
            username
            email
            accountStatus
            role
        }
    }
`;
exports.VERIFY_USER = (0, client_1.gql) `
    query verifyUser($userId: ID!) {
        verifyUser(userId: $userId) {
            _id
            username
        }
    }
`;
