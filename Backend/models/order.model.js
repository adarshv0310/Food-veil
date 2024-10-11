// models/Order.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    items: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true,
    }],
    status: {
        type: String,
        enum: ['pending', 'accepted', 'in_transit', 'delivered'],
        default: 'pending',
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
}, { timestamps: true });

const Order = mongoose.model('Order', orderSchema);
export default Order;