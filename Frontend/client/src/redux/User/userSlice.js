import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.currentUser = action.payload; // Use currentUser instead of user
        },
        clearUser: (state) => {
            state.currentUser = null; // Use currentUser instead of user
        },
    },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;