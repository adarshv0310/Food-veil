import mongoose from "mongoose";
import MenuItem from "../models/menuitem.model.js";
import Resturant from "../models/resturant.model.js";
import { errorhandler } from "../utils/error.js";




export const createMenuItem = async(req, res, next) => {
    try {

        const { name, description, price, resturantId, category, imageUrl } = req.body;

        const restaurantIdRegex = /^REST-[A-Z0-9-]+-\d{13}$/;
        if (!restaurantIdRegex.test(resturantId)) {
            return next(errorhandler(400, 'Invalid restaurant ID format'));
        }

        const resturant = await Resturant.findOne({ customid: resturantId });

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
        console.error("Error: ", error);
        return next(errorhandler(500, 'Internal server error'));
    }
}


// get all menu items 
export const getMenuItems = async() => {
    try {
        const menuItems = await MenuItem.find().populate('restaurant');
        res.status(200).json({
            success: true,
            message: 'All menuitem get success',
            menuItems,
        });
    } catch (error) {
        console.log(error);
        next(errorhandler(500, 'Internal server error'));
    }
}


export const getMenuItembyId = async() => {
    try {
        const id = req.params.id;
        const menuItem = await MenuItem.findById(id).populate('restaurant');
        if (!menuItem) {
            return next(errorhandler(404, 'Menu Item not found'));
        }
        res.status(200).json({
            success: true,
            message: 'Item found by id',
            menuItem,
        });
    } catch (error) {
        console.log(error);
        next(errorhandler(500, 'Internal server error'));
    }
}



export const updatemenuItem = async() => {
    try {

        const id = req.params.id;
        const updatedmenuItem = await MenuItem.findByIdAndUpdate(id, { $set: req.body }, { new: true, runValidators: true });


        if (!updatedmenuItem) {
            return next(errorhandler(404, 'Menu item not found'));
        }

        res.status(200).json({
            success: true,
            message: 'Menu Item updated successfully',
            updatedmenuItem,
        });

    } catch (error) {
        console.log(error);
        return next(errorhandler(500, 'Internal server error'));
    }
}



export const deletemenuItems = async() => {
    try {
        const id = req.params.id;

        const menuItem = MenuItem.findByIdAndDelete(id);


        if (!menuItem) {
            next(errorhandler(404, 'Menu item not found'));
        }

        res.status(200).json({
            success: true,
            message: 'Menu Item deleted successfully',
        });
    } catch (error) {
        console.log(error);
        return next(errorhandler(500, 'Internal server error'));
    }
}