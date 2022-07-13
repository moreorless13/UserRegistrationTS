import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import ForgotPasswordForm from './ForgotPasswordForm';

const LoginForm = ({ form, handleFormChange }: any) => {
    const [userFormData, setUserFormData] = useState({ username: '', password: '' });
    const [validated, setValidated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    const [login, { error }] = useMutation(LOGIN_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true);
        } else {
            setShowAlert(false);
        }
    }, [error]);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: HTMLFormElement = event.currentTarget; 
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        setValidated(true)

        try {
            const { data } = await login({
                variables: { ...userFormData },
            });
            localStorage.setItem('username', userFormData.username)
            Auth.login(data.login.token);
        } catch (error) {
            console.error(error);
            setShowAlert(true);
        };

        setUserFormData({
            username: '',
            password: '',
        });
    };

    return (
        <div className="container bg-warning rounded pt-2 pb-2">
            <h2>Login</h2>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Something went wrong with your login credentials!
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control type='text' placeholder='Username' name='username' onChange={handleInputChange} value={userFormData.username} required />
                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='username'>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' name='password' onChange={handleInputChange} value={userFormData.password} required />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <br />
                <div className='row justify-content-center'>
                    <Button  className='padding bg-dark rounded justify-content-center' disabled={!(userFormData.username && userFormData.password)} type='submit' variant='success'>Submit</Button>
                </div>
                <br />
                <div className='row justify-content-center'>
                    <ForgotPasswordForm />
                </div>
            </Form>
            <br />
            <Button variant='dark' onClick={() => handleFormChange('SignUp')}>SignUp Form</Button>
        </div>
    );
}

export default LoginForm;