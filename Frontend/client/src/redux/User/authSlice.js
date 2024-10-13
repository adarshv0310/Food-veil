import { createSlice } from "@reduxjs/toolkit";


const initialstate = {
    currentUser: null,
    error: null,
    loading: false,

}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        signinstart: (state) => {
            state.loading = true;
        },
        signinsuccess: (state, action) => {
            state.currentUser = action.payload; // Updating the state with the user's data
            state.loading = false;
            state.error = null; // setting my previous error to null

        },
        signinfailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
    }

});




export const {
    signinfailure,
    signinstart,
    signinsuccess
} = authSlice.actions;



export default authSlice.reducer;