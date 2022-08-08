import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../utils/queries';
import Auth from '../utils/auth';
import { Table } from 'react-bootstrap';

const AllUsers = () => {
    const currentUser = Auth.getUser();
    console.log(currentUser)
    const { data, loading } = useQuery(QUERY_USERS);
    const users = data?.users;
    console.log(users)
    return (
        <div>
            <nav>
                <div className="nav nav-tabs" id="nav-tab" role="tablist">
                    <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="/" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                </div>
            </nav>
            <h1>All Users</h1>
            {loading ? <p>Loading...</p> : <Table striped bordered hover size="sm">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Account Status:</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: any) => <tr key={user.id}><td>{user.username}</td> <td>{user.role}</td> <td>{user.accountStatus}</td></tr>)}
                </tbody>
                </Table>
            }
        </div>
    )
}

export default AllUsers;