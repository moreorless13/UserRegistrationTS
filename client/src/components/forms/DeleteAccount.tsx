import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react'
import { Form, Button, Alert } from 'react-bootstrap';
import { useMutation } from '@apollo/client'
import { REMOVE_USER } from '../../utils/mutations'
import Auth from '../../utils/auth'

const DeleteAccount = () => {
    const [userFormData, setUserFormData] = useState({ username: '', email: '', password: '' })
    const [validated] = useState(false)
    const [showAlert, setShowAlert] = useState(false);
    const [removeUser, { error }] = useMutation(REMOVE_USER);

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [error]);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
    };

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form: HTMLFormElement = event.currentTarget; 
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }

        try {
            await removeUser({
                variables: { ...userFormData },
            });

            Auth.logout()

        } catch (error) {
            console.error(error);
            setShowAlert(true);
        };

        setUserFormData({
            username: '',
            email: '',
            password: '',
        });

        window.location.assign('/')
    };

    return (
        <div className="container bg-warning rounded pt-2 pb-2" style= {{
            position: 'absolute', top: '30%', 
        }}>
            <h6>Confirm Username and Password to delete account</h6>
            <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
                <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
                    Incorrect Credentials!
                </Alert>
                <Form.Group>
                    <Form.Label htmlFor='username'>Username</Form.Label>
                    <Form.Control type='text' placeholder='Username' name='username' onChange={handleInputChange} value={userFormData.username} required />
                    <Form.Control.Feedback type='invalid'>Username is required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='email'>Email</Form.Label>
                    <Form.Control type='text' placeholder='Email' name='email' onChange={handleInputChange} value={userFormData.email} required />
                    <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label htmlFor='username'>Password</Form.Label>
                    <Form.Control type='password' placeholder='Password' name='password' onChange={handleInputChange} value={userFormData.password} required />
                    <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
                </Form.Group>
                <Button  className='padding bg-dark rounded' disabled={!(userFormData.username && userFormData.email && userFormData.password)} type='submit' variant='success'>Submit</Button>
            </Form>
        </div>
    );
}
export default DeleteAccount;