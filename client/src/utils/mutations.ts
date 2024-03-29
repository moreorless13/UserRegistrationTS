import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {
        addUser(username: $username, email: $email, password: $password) {
            user {
                _id
                username
                email
            }
        }
    }
`

export const LOGIN_USER = gql`
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
`

export const REMOVE_USER = gql`
    mutation removeUser($username: String!, $email: String!, $password: String!) {
        removeUser(username: $username, email: $email, password: $password) {
            _id
            username
            email
        }
    }
`

export const FORGOT_PASSWORD = gql`
    mutation forgotPassword($email: String!) {
        forgotPassword(email: $email) {
            email
        }
    }
`

export const UPDATE_PASSWORD = gql`
    mutation updatePassword($userId: ID!, $oldPassword: String!, $newPassword: String!, $confirmationPassword: String!) {
        updatePassword(userId: $userId, oldPassword: $oldPassword, newPassword: $newPassword, confirmationPassword: $confirmationPassword) {
            _id
        }
    }
`

export const CHANGE_USER_STATUS = gql`
    mutation changeUserAccountStatus($userId: ID!, $accountStatus: String!) {
        changeUserAccountStatus(userId: $userId, accountStatus: $accountStatus) {
            _id
            accountStatus
        }
    }
`