import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
    query users {
        users {
            _id
            username
            email
            accountStatus
        }
    }
`

export const QUERY_USER = gql`
    query user($userId: ID!) {
        user(userId: $userId) {
            _id
            username
            email
        }
    }
`

export const QUERY_ME = gql`
    {
        me {
            _id
            username
            email
        }
    }
`

export const VERIFY_USER = gql`
    query verifyUser($userId: ID!) {
        verifyUser(userId: $userId) {
            _id
            username
        }
    }
`