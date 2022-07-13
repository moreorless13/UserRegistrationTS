import { Types } from 'mongoose';
import nodemailer from 'nodemailer';
import sanitizedConfig from '../config';
export const sendConfirmationEmail = (username: string, email: string, userId: Types.ObjectId) => {
    const transporter = nodemailer.createTransport({
        host: sanitizedConfig.HOST,
        port: sanitizedConfig.TRANSPORTPORT,
        secure: false,
        auth: {
            user: sanitizedConfig.USER,
            pass: sanitizedConfig.PASS
        },
        logger: true
    });
    console.log('Sending confirmation email....');
    transporter.sendMail({
        from: sanitizedConfig.USER,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
                <h2>Hello, ${username}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking the following link:</p>
                <a href=http://localhost:3000/confirm/${userId}> Click Here </a>`
    }).catch((err) => console.log(err))
}

export const sendForgotPasswordEmail = (email: string, userId: Types.ObjectId) => {
    const transporter = nodemailer.createTransport({
        host: sanitizedConfig.HOST,
        port: sanitizedConfig.TRANSPORTPORT,
        secure: false,
        auth: {
            user: sanitizedConfig.USER,
            pass: sanitizedConfig.PASS
        },
        logger: true
    });
    console.log('sending password reset email...')
    transporter.sendMail({
        from: sanitizedConfig.USER,
        to: email,
        subject: "Reset your password",
        html: `<h1>Forgot Password Email</h1>
                <h2>Please click the link below to reset your password: </h2>
                <a href=http://localhost:3000/forgotPassword/${userId}> Click here to reset your password <a>`
    }).catch((err) => console.log(err))
}