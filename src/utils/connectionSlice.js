import { createSlice } from "@reduxjs/toolkit";

const connection = createSlice({
    name : 'connection',
    initialState:"",
    reducers : {
        addConnections : (state, action) => {
            return action.payload
        }
    }
})

export const {addConnections} = connection.actions
export default connection.reducer