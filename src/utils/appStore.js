import { configureStore } from "@reduxjs/toolkit";
import userReducer from './userSlice'
import feedReducer from './feedSlice'
import connectionReducer from './connectionSlice'
import requestReducer from './requestSlice'

export const appStore = configureStore({
    reducer:{
        userStore : userReducer,
        feedStore : feedReducer,
        connectionStore : connectionReducer,
        requestStore : requestReducer
    }
})