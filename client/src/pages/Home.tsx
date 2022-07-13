import React, { useState } from 'react';
import Auth from '../utils/auth';
import SignupForm from '../components/forms/SignUp';
import LoginForm from '../components/forms/Login';
import DeleteAccount from '../components/forms/DeleteAccount';

const HomePage = () => {
    const [form, setForm] = useState('SignUp')
    const handleFormChange = (form: any) => setForm(form);
    if (Auth.loggedIn()) {
        const username = localStorage.getItem('username');
        return (
            <div>
                <h1>
                    Welcome back, {username}
                </h1>
                <DeleteAccount />
            </div>
        )
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
