import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorhandler } from "../utils/error.js";
import jwt from 'jsonwebtoken';



export const Signup = async(req, res, next) => {
    const { email, password, name, role } = req.body;
    //console.log(req.body);


    if (role === 'admin') {
        const existingadmin = await User.findOne({ role: 'admin' });
        if (existingadmin) {
            return next(errorhandler(400, 'Admin already exist'));
        }
    }

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
        console.error('Signin error:', error);
        return next(errorhandler(500, 'Internal Server Error'));
    }
};




export const Signin = async(req, res, next) => {
    const { email, password } = req.body;

    try {
        // Checking if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(errorhandler(401, 'Invalid email or password'));
        }

        // Password checking using async version
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return next(errorhandler(401, 'Invalid email or password'));
        }

        // Generating JWT token for secure authentication

        let token;
        let rest;
        try {
            token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
            const { password: pass, ...userrest } = user._doc;
            rest = userrest;

        } catch (error) {
            return next(errorhandler(500, `Token generation error: ${error.message}`)); // Passing the error 
        }


        // Setting cookie and responding 
        res
            .cookie('access_token', token, { httpOnly: true })
            .status(200)
            .json(rest);

    } catch (err) {
        console.error('Signin error:', err);
        return next(errorhandler(500, 'Internal Server Error'));
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