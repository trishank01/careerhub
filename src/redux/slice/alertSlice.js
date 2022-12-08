import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loading : false,
}


const alertSlice = createSlice({
    name : 'alert',
    initialState ,
    reducers : {
        SHOW_LOADING : (state , action) => {
            state.loading = true
        },
        HIDE_LOADING : (state , action) => {
            state.loading = false
        },
    }
})

export const {SHOW_LOADING , HIDE_LOADING} = alertSlice.actions

export const selectLoadingState = (state) => state.alert.loading

export default alertSlice.reducer