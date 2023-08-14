import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  _id: string;
  email: string;
  userName: string;
  is_prime: boolean;
  status: boolean;
}

const initialState: UserState = {
  _id: "",
  email: "",
  userName: "",
  is_prime: false,
  status: false,
};

export type Args = {
  userName: string;
  email: string;
  _id: string;
  is_prime: boolean;
  status: boolean;
};
const userAuth = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAddDetails(state, actions: PayloadAction<Args>) {
      const newItem = actions.payload;
      state.userName = newItem.userName;
      state.email = newItem.email;
      state._id = newItem._id;
      state.is_prime = newItem.is_prime;
      state.status = newItem.status;
    },
    userLogout(state, actions) {
      const newItem = actions.payload;
      state.userName = newItem.userName;
      state.email = newItem.email;
      state._id = newItem._id;
      state.is_prime = newItem.is_prime;
      state.status = newItem.status;
    },
  },
});

export const userActions = userAuth.actions;
export default userAuth.reducer;
