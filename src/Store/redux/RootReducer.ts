import {combineReducers} from "@reduxjs/toolkit";
import adminAuth from "./AdminAuth";
import userAuth from "./UserAuth";

const rootReducer = combineReducers({
    admin:adminAuth,
    user:userAuth
})

export default rootReducer;