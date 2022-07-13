import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { FORGOT_PASSWORD } from '../../utils/mutations';
import { useMutation } from '@apollo/client';

const ForgotPasswordForm = () => {
    const [userFormData, setUserFormData] = useState({ email: '' });
    const [validated] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [forgotPassword, { error }] = useMutation(FORGOT_PASSWORD);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true)
    const handleCloseModal = () => setShowModal(false)

    useEffect(() => {
        if (error) {
            setShowAlert(true)
        } else {
            setShowAlert(false)
        }
    }, [error])

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value })
    }

    const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const data = await forgotPassword({
                variables: { ...userFormData }
            });
            return data
        } catch (error) {
            console.error(error)
            setShowAlert(true)            
        }
        setUserFormData({ email: '' });
    }

    return (
        <div>
            <Button onClick={handleShowModal} variant='danger'>Forgot Password</Button>
            <Modal show={showModal} onHide={handleCloseModal}>
                <Form noValidate validated={validated} onSubmit={handleFormSubmit} className="container bg-warning rounded pt-2 pb-2">
                    <Modal.Header>
                        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>Invalid Email Address</Alert>
                        <i className="bi bi-file-excel-fill" onClick={handleCloseModal}></i>
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Group>
                            <Form.Label htmlFor='email'>Account Email Address</Form.Label>
                            <Form.Control type="email" placeholder='Account Email Address' name='email' onChange={handleInputChange} value={userFormData.email} required />
                            <Form.Control.Feedback type="invalid">Email Address Required</Form.Control.Feedback>
                        </Form.Group>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className='padding bg-dark' disabled={!userFormData.email} type='submit' variant='success'>Submit</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        </div>
    )
}

export default ForgotPasswordForm