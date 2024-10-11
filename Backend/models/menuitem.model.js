// models/MenuItem.js
import mongoose from 'mongoose';

const menuitemSchema = new mongoose.Schema({
    name: {
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
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Restaurant',
        required: true,
    },
}, { timestamps: true });

const MenuItem = mongoose.model('MenuItem', menuitemSchema);
export default MenuItem;