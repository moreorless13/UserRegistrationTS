import { gql } from '@apollo/client'

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!, $dateOfBirth: Date!) {
        addUser(username: $username, email: $email, password: $password, dateOfBirth: $dateOfBirth) {
            user {
                _id
                username
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