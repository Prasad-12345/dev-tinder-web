import { createSlice } from "@reduxjs/toolkit";

const request = createSlice({
    name : 'request',
    initialState:"",
    reducers : {
        addRequests : (state, action) => {
            return action.payload
        },
        removeRequest : (state, action) => {
            const newArray = state.filter((r) => r._id != action.payload)
            return newArray
        }
    }
})

export const {addRequests, removeRequest} = request.actions
export default request.reducer