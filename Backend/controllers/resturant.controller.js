import Resturant from "../models/resturant.model.js";
import User from '../models/user.model.js'
import {
    errorhandler
} from '../utils/error.js'


export const createRestaurant = async(req, res, next) => {

    try {
        const { name, location, ownerId } = req.body;

        // fetching owner from the user model
        const owner = await User.findById(ownerId);

        if (!owner) {
            return next(errorhandler(404, 'Owner not found'));
        }

        // creating customid
        const customId = `REST-${name.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`;

        const newRestaurant = new Resturant({
            _id: customId,
            name,
            owner: ownerId,
            location,
        });


        await newRestaurant.save();


        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            restaurant: {


                name: newRestaurant.name,
                location: newRestaurant.location,
                // Excluding the password from the response
            },

        })

    } catch (error) {
        return next(errorhandler(500, 'Internal Server Error'));
    }
}