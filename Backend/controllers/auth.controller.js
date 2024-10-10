import User from "../models/user.model.js";
import bcrypt from 'bcrypt';
import { errorhandler } from "../utils/error.js";




export const Signup = async(req, res, next) => {
    const { email, password, name, role } = req.body;
    try {


        // to check if usermail alrady exist
        const existinguser = User.findOne({ email });
        if (existinguser) {
            return (errorhandler(409, 'User already exist with this email'));
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
}