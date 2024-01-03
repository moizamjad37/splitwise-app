import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    email: ""
}

export const userEmailSlice = createSlice({
    name: "userEmail",
    initialState,
    reducers: {
        
        storeUserEmail: (state, action) => {
            state.email = action.payload;
            console.log(action.payload);
        },
    }
})

export const {storeUserEmail,} = userEmailSlice.actions;

export default userEmailSlice.reducer;