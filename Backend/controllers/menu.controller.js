import mongoose from "mongoose";
import MenuItem from "../models/menuitem.model.js";
import Resturant from "../models/resturant.model.js";
import { errorhandler } from "../utils/error.js";




export const createMenuItem = async(req, res, next) => {
    try {

        const { name, description, price, resturantId, category, imageUrl } = req.body;

        if (!mongoose.Types.ObjectId.isValid(resturantId)) {
            return next(errorhandler(400, 'Invalid  resturant ID format'));
        }

        const resturant = await Resturant.findById(resturantId);

        if (!resturant) {
            return next(errorhandler(404, 'Resturant not found'));
        }

        const newMenuItem = new MenuItem({
            name,
            category,
            price,
            description,
            restaurant: resturantId,
            imageUrl
        });

        await newMenuItem.save();


        res.status(200).json({
            success: true,
            message: 'Menu Added successfully',
            menuItem: newMenuItem

        })

    } catch (error) {
        return next(errorhandler(500, 'Internal server error'));
    }
}