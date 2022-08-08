"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGE_USER_STATUS = exports.UPDATE_PASSWORD = exports.FORGOT_PASSWORD = exports.REMOVE_USER = exports.LOGIN_USER = exports.ADD_USER = void 0;
const client_1 = require("@apollo/client");
exports.ADD_USER = (0, client_1.gql) `
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            user {
                _id
                username
                email
            }
        }
    }
`;
exports.LOGIN_USER = (0, client_1.gql) `
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            token
            user {
                _id
                username
                role
            }
        }
    }
`;
exports.REMOVE_USER = (0, client_1.gql) `
    mutation removeUser($username: String!, $email: String!, $password: String!) {
        removeUser(username: $username, email: $email, password: $password) {
            _id
            username
            email
        }
    }
`;
exports.FORGOT_PASSWORD = (0, client_1.gql) `
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email) {
            email
        }
    }
`;
exports.UPDATE_PASSWORD = (0, client_1.gql) `
    mutation updatePassword($userId: ID!, $oldPassword: String!, $newPassword: String!, $confirmationPassword: String!) {
        updatePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword, confirmationPassword: $confirmationPassword) {
            _id
        }
    }
`;
exports.CHANGE_USER_STATUS = (0, client_1.gql) `
    mutation changeUserAccountStatus($userId: ID!, $accountStatus: String!) {
        changeUserAccountStatus(userId: $userId, accountStatus: $accountStatus) {
            _id
            accountStatus
        }
    }
`;
