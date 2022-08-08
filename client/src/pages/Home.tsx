import React, { useState } from 'react';
import Auth from '../utils/auth';
import { useQuery } from '@apollo/client';
import { QUERY_ME } from '../utils/queries';
import SignupForm from '../components/forms/SignUp';
import LoginForm from '../components/forms/Login';
import DeleteAccount from '../components/forms/DeleteAccount';
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm';
import LogoutButton from '../components/buttons/LogoutButton';

const HomePage = () => {
    const [form, setForm] = useState('SignUp')
    const handleFormChange = (form: any) => setForm(form);
    const { data, loading } = useQuery(QUERY_ME);
    const user = data?.me;
    console.log(user)
    if (Auth.loggedIn()) {
        const username = localStorage.getItem('username');
        if ( user?.role === 'Admin' ) {
            return (
                <div>
                    <nav>
                        <div className="nav nav-tabs" id="nav-tab" role="tablist">
                            <a className="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
                            <a className="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
                            <a className="nav-item nav-link" id="nav-users-tab" data-toggle="tab" href="/users" role="tab" aria-controls="nav-users" aria-selected="false">All Users</a>
                        </div>
                    </nav>
                    <h1>Welcome {username}</h1>
                    <LogoutButton />
                    <DeleteAccount />
                </div>
            )
        } else {
            return (
                <div>
                    <h1>
                        Welcome back, {username}
                    </h1>
                    <LogoutButton />
                    <DeleteAccount />
                </div>
            )
        }

    } else {
        switch (form) {
            case 'SignUp':
                return (
                    <SignupForm form={form} handleFormChange={handleFormChange} />
                )
            case 'Login':
                return (
                    <LoginForm form={form} handleFormChange={handleFormChange} />
                )
        
            default:
                return (
                    <SignupForm />
                )
        }
    }

}

export default HomePage;
