import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CurrentUser {
  email: string;
  token: string;
}
const currentUser: CurrentUser = {
  email: "",
  token: "",
};
const authSlice = createSlice({
  name: "auth",
  initialState: currentUser,
  reducers: {
    signIn: (_state, action: PayloadAction<CurrentUser>) => {
      return action.payload;
    },
  },
});

export interface LoginCredentials {
  email: string;
  password: string;
  authCode?: number;
}

export const loginApp = createAction<LoginCredentials>("auth/loginApp");

export const { signIn } = authSlice.actions;

export default authSlice.reducer;
