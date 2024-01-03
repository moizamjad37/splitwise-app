import { configureStore } from "@reduxjs/toolkit";
import userEmailReducer from "../slices/userEmailSlice";

export const store = configureStore ({
    reducer: {
        useremail: userEmailReducer,
    },
})