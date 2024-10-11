import mongoose from 'mongoose';



const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,

    },

    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        default: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
    },
    role: {
        type: String,
        enum: ['customer', 'delivery_person', 'admin', 'resturant_owner'],
        default: 'customer',
        required: true,
    },
}, { timestamps: true });



const User = mongoose.model('User', userSchema);


export default User;