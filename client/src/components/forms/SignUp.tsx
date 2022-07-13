import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../../utils/mutations';

const SignupForm = ({ form, handleFormChange }: any) => {
    const [userFormData, setUserFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [addUser, { error }] = useMutation(ADD_USER);

    useEffect(() => {
        if (error) {
        setShowAlert(true);
        } else {
        setShowAlert(false);
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
            event.preventDefault()
            event.stopPropagation()
        }

        try {
            const { data } = await addUser({
                variables: { ...userFormData },
            });
            return data;
        } catch (error) {
            console.error(error)
        }

        setUserFormData({
            username: '',
            email: '',
            password: ''
        });

        window.location.assign('/')
    }

    return (
        <div className='container bg-warning rounded pt-2 pb-2'>
        {/* This is needed for the validation functionality above */}
            <Form   noValidate validated={validated} onSubmit={handleFormSubmit}>
                {/* show alert if server response is bad */}
                <Alert 
                    dismissible
                    onClose={() => setShowAlert(false)}
                    show={showAlert}
                    variant="danger"
                > Something went wrong with your signup! </Alert>

                <Form.Group>
                <Form.Label htmlFor="username">Username</Form.Label>
                <Form.Control
                    type="text"
                    placeholder="Your username"
                    name="username"
                    onChange={handleInputChange}
                    value={userFormData.username}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Username is required!
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                <Form.Label htmlFor="email">Email</Form.Label>
                <Form.Control
                    type="email"
                    placeholder="Your email address"
                    name="email"
                    onChange={handleInputChange}
                    value={userFormData.email}
                    required
                />
                <Form.Control.Feedback type="invalid">
                    Email is required!
                </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                <Form.Label htmlFor="password">Password</Form.Label>
                <Form.Control
                    
                    type="password"
                    placeholder="Your password"
                    name="password"
                    onChange={handleInputChange}
                    value={userFormData.password}
                    required
                    
                />
                <Form.Control.Feedback type="invalid">
                    Password is required!
                </Form.Control.Feedback>
                </Form.Group>
                <br />
                <Button className='padding bg-dark' disabled={!(userFormData.username && userFormData.email && userFormData.password)} type="submit" variant="success">Submit</Button>
            </Form>
            <br />
            <div className='row justify-content-center'>
                <Button variant='dark' onClick={() => handleFormChange('Login')} >Login Form</Button>
                <br />
            </div>
        </div>
    )
}

export default SignupForm;