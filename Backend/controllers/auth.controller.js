import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



export const Signup = async(req, res, next) => {
    const { email, password, name, role } = req.body;
    try {


        // to check if usermail alrady exist
        const existinguser = await User.findOne({ email });
        if (existinguser) {
            return next(errorhandler(409, 'User already exist with this email'));
        }


        // to save newuser
        const hashedpassword = await bcrypt.hashSync(password, 10);
        const newuser = new User({ name, email, role, password: hashedpassword });

        await newuser.save();

        res.status(201).json({

            success: true,
            message: 'User registered successfully',
            user: {
                role: newuser.role,
                email: newuser.email,
                name: newuser.name,
                // Excluding the password from the response
            },

        })
    } catch (error) {
        next(error);
    }
};


export const Signin = async(req, res, next, err) => {
    const { email, password } = req.body;
    try {
        // to check if user is already in database
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorhandler(404, 'User not found'));
        }

        // to verify password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return next(errorhandler(400, 'Invalid credentials'));
        }

        /* 
        let token;
        try {
            token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        } catch (error) {
            return (errorhandler(500, `Token generation error: ${error}`));
        }*/

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Optional expiration time
        const { password: pass, ...rest } = user._doc;

        //  cookie and respond
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);


    } catch (error) {
        next(error);
    }
};



export const signout = async(req, res, error, next) => {
    // clearing the token
    try {
        res.clearCookie('access_token');
        res.status(200).send('Logged out successfully');
    } catch (error) {
        next(error);
    }

};