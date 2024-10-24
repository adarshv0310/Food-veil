// models/MenuItem.js
import mongoose from 'mongoose';

const menuitemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true,
    },
    restaurant: {
        type: String, // Change this to String to accommodate custom IDs
        required: true,
    },
    imageUrl: {
        type: String,
        required: true,
        default: "https://www.foodiesfeed.com/wp-content/uploads/2023/08/pork-meat-with-pak-choi-and-rice.jpg"
    },
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuitemSchema);
export default MenuItem;