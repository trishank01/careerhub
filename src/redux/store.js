import { configureStore , combineReducers } from "@reduxjs/toolkit";
import alertReducer from './slice/alertSlice'


const rootReducer = combineReducers({
        alert : alertReducer
     
})

const store = configureStore({
     reducer : rootReducer
})

export default store