import {
    createSlice
} from '@reduxjs/toolkit';


const initialState = {
    resturants: [],
};


const resturantSlice = createSlice({
    name: 'resturant',
    initialState,
    reducers: {
        addResturant: (state, action) => {
            state.resturants.push(action.payload);
        }
    },
});


export const {
    addResturant
} = resturantSlice.actions;
export default resturantSlice.reducer;