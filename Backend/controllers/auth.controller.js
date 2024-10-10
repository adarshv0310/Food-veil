import User from "../models/user.model.js";
import bcryptjs from 'bcryptjs';




export const Signup = async(req, res, next) => {

    try {
        const { email, password, name, role } = req.body;

        // to check if usermail alrady exist
        const existinguser = User.findOne({ email });
        if (existinguser) {
            return ()
        }

    } catch (error) {
        next(error);
    }
}