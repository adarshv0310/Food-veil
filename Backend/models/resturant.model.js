import mongoose from "mongoose";


const resturantSchema = new mongoose.Schema({
    customid: {
        type: String, // Change this from ObjectId to String
        required: true,
    },
    name: {
        type: String,
        required: true,
        unique: true
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    location: {
        type: String,

    },
    menu: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem'
    }],
}, { timestamps: true });

const Resturant = mongoose.model('Resturant ', resturantSchema);
export default Resturant;