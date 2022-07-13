import 'dotenv/config';
import * as jwt from 'jsonwebtoken';

import sanitizedConfig from '../config';

const secret = sanitizedConfig.SECRET;
const expiration = sanitizedConfig.EXPIRATION;

export const authMiddleware = async ({ req }: any) => {
    let token = req.body.token || req.query.token || req.headers.authorization;
    if (req.headers.authorization) {
        token = token.split(' ').pop().trim();
    }

    if (!token) {
        return req
    }

    try {
        const data = jwt.verify(token, secret, { maxAge: expiration })
        req.user = data;
    } catch (error) {
        console.log(error, 'Invalid Token');
    }

    return req;
};

export const signToken = ({ username, email, _id }: any) => {
    const payload = { username, email, _id };
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
};

export const authorizedUser = ({ username, email, _id, role}: any) => {
    const payload = { username, email, _id, role};
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration })
}
