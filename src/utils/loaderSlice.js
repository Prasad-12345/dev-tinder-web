import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
    name : "loderSlice",
    initialState : {isLoading : false},
    reducers : {
        addLoader : (state, action) => {
            state.isLoading = true
        },
        removeLoader : (state, action) => {
            state.isLoading =  false
        }
    }
})

export const {addLoader, removeLoader} = loaderSlice.actions
export default loaderSlice.reducer