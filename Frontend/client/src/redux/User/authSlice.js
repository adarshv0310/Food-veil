import { createSlice } from "@reduxjs/toolkit";


const initialState = {
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
        setLoading: (state, action) => {
            state.loading = action.payload; // Set loading to true or false
        },
        setError: (state, action) => {
            state.error = action.payload; // Set the error message
        },
        clearError: (state) => {
            state.error = null; // Clear the error
        },
    }

});




export const {
    signinfailure,
    signinstart,
    signinsuccess,
    setError,
    setLoading,
    clearError
} = authSlice.actions;



export default authSlice.reducer;