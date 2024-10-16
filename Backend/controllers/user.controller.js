import User from '../models/user.model.js'
import { errorhandler } from '../utils/error.js'
import bcrypt from 'bcrypt'


export const updateUser = async(req, res, next) => {
    if (req.user.id !== req.params.id) {

        return next(errorhandler(401, 'Your account not found'));
    }

    try {

        if (req.body.password) {
            req.body.password = await bcrypt.hash(req.body.password, 10);
        }


        // Update the user in the database
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return next(errorhandler(404, 'User not found'));
        }

        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);
    } catch (error) {

        return next(errorhandler(500, 'Internal Server Error'));

    }
};