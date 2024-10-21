import User from '../models/user.model.js'
import { errorhandler } from '../utils/error.js'
import bcrypt from 'bcrypt'
import { uploadOnCloudinary } from '../utils/cloudinary.js';

export const updateUser = async(req, res, next) => {

    const userID = req.userID.toString();
    const id = req.params.id;





    if (userID.toLowerCase() !== id.toLowerCase()) {
        return res.status(403).json({ "Message": "Access denied!" });
    }


    try {
        console.log('User ID from token:', req.user.id);
        console.log('User ID from params:', req.params.id);
        const userInDb = await User.findById(req.user.id);
        console.log('User in DB:', userInDb);


        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }

        // Handle file upload if an avatar is provided
        /*if (req.file) {
            console.log('Uploaded file:', req.file); // Log the uploaded file
            const cloudinaryResponse = await uploadOnCloudinary(req.file.buffer);
            req.body.avatar = cloudinaryResponse.url; // Save the URL from Cloudinary
            console.log('Cloudinary response:', cloudinaryResponse); // Log response for debugging
        } */


        // Updating  the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next(errorhandler(404, 'User not found'));
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {
        console.error('Error updating user:', error);
        return next(errorhandler(500, 'Internal Server Error'));

    }
};



export const deleteUser = async(req, res, next) => {
    if (req.user.id !== req.params.id)
        return next(errorhandler(401, 'Your account not found'));
    try {
        await User.findByIdAndDelete(req.params.id);
        res.clearCookie('access_token');
        res.status(200).json('User has been deleted!');
    } catch (error) {
        return next(errorhandler(500, 'Internal Server Error'));
    }
};