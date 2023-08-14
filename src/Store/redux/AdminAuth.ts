import {createSlice,PayloadAction} from "@reduxjs/toolkit";

interface AdminState{
    AdminEmail:string
}

const initialState:AdminState={
    AdminEmail:""
}
const adminAuth=createSlice({
    name:"admin",
    initialState,
    reducers:{
        AdminLogin(state,actions: PayloadAction<{ email: string }>){
            const newItem = actions.payload;
            state.AdminEmail= newItem.email
        },
        AdminLogout(state,actions){
            const newItem = actions.payload;
            state.AdminEmail= newItem.email
        }
    }

})

export const AdminAction = adminAuth.actions
export default adminAuth.reducer




