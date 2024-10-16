import jwt from 'jsonwebtoken';
import { errorhandler } from '../utils/error.js';


export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token;
    console.log('Token:', token);
    if (!token) return next(errorhandler(401, 'Unauthorized'));

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403, 'Forbidden'));

        console.log('Decoded user:', user); // Checking  the decoded token payload
        req.user = user;
        next();
    });
};