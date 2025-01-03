import Resturant from "../models/resturant.model.js";
import User from '../models/user.model.js'
import mongoose from "mongoose";
import {
    errorhandler
} from '../utils/error.js'


export const createRestaurant = async(req, res, next) => {

    try {
        const { name, location, ownerId } = req.body;


        if (!mongoose.Types.ObjectId.isValid(ownerId)) {
            return next(errorhandler(400, 'Invalid owner ID format'));
        }


        console.log(`Owner id ${ownerId}`);
        // fetching owner from the user model

        const owner = await User.findById(ownerId);

        if (!owner) {
            return next(errorhandler(404, 'Owner not found'));
        }

        // creating customid
        const customId = `REST-${name.replace(/\s+/g, '-').toUpperCase()}-${Date.now()}`;

        const newRestaurant = new Resturant({
            customid: customId,
            name,
            owner: ownerId,
            location,
        });


        await newRestaurant.save();


        res.status(201).json({
            success: true,
            message: 'Resturant registered successfully',
            restaurant: {


                name: newRestaurant.name,
                location: newRestaurant.location,
                // Excluding the password from the response
            },

        })

    } catch (error) {
        console.log("Error : ", error);
        return next(errorhandler(500, 'Internal Server Error'));
    }
}