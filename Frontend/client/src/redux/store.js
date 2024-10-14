import { configureStore } from '@reduxjs/toolkit';
import authReducer from './User/authSlice.js';
import userReducer from './User/userSlice.js';



export const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
    },

});