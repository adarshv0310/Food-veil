import jwt from 'jsonwebtoken';
import { errorhandler } from '../utils/error.js';
import User from '../models/user.model.js';

export const verifyToken = async(req, res, next) => {
    const token = req.cookies.access_token;
    /* const authHeader = req.headers['authorization'];
     const token = authHeader && authHeader.split(' ')[1];
     */
    console.log('Token:', token);
    if (!token) return next(errorhandler(401, 'Unauthorized'));

    /*jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return next(errorhandler(403, 'Forbidden'));

        console.log('Decoded user:', user); // Checking  the decoded token payload
        req.user = user;
        next(); 
    });*/


    const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

    const user = await User.findById(decodedToken._id).select("-role")

    if (!user) {
        return next(errorhandler(401, 'Invalid Access Token'))
    }

    req.user = user;
    req.userID = user._id;
    next();
};