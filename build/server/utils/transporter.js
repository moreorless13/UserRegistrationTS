"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendForgotPasswordEmail = exports.sendConfirmationEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendConfirmationEmail = (username, email, userId) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'giovani.lindgren20@ethereal.email',
            pass: '81GCHve5gaBMEK55vp'
        }
    });
    console.log('Sending confirmation email....');
    transporter.sendMail({
        from: config_1.default.USER,
        to: email,
        subject: "Please confirm your account",
        html: `<h1>Email Confirmation</h1>
                <h2>Hello, ${username}</h2>
                <p>Thank you for subscribing. Please confirm your email by clicking the following link:</p>
                <a href=http://localhost:3000/confirm/${userId}> Click Here </a>`
    }).catch((err) => console.log(err));
};
exports.sendConfirmationEmail = sendConfirmationEmail;
const sendForgotPasswordEmail = (email, userId) => {
    const transporter = nodemailer_1.default.createTransport({
        host: config_1.default.HOST,
        port: config_1.default.TRANSPORTPORT,
        tls: {
            rejectUnauthorized: true,
        },
        secure: false,
        auth: {
            user: config_1.default.USER,
            pass: config_1.default.PASS
        },
        logger: true
    });
    console.log('sending password reset email...');
    transporter.sendMail({
        from: config_1.default.USER,
        to: email,
        subject: "Reset your password",
        html: `<h1>Forgot Password Email</h1>
                <h2>Please click the link below to reset your password: </h2>
                <a href=http://localhost:3000/forgotPassword/${userId}> Click here to reset your password <a>`
    }).catch((err) => console.log(err));
};
exports.sendForgotPasswordEmail = sendForgotPasswordEmail;
