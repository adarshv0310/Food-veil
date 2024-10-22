import mongoose from "mongoose";


const resturantSchema = new mongoose.Schema({
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