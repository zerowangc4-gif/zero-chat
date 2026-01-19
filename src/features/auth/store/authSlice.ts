import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  address: string;
  publicKey: string;
  username: string;
}

export interface AuthData {
  user: User;
  token: string;
}

const authData = {
  user: {
    address: "",
    publicKey: "",
    username: "",
  },
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authData,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      const { user, token } = action.payload;
      state.user = { ...user };
      state.token = token;
    },
  },
});

export interface RegistrationPayload {
  address: string;
  publicKey: string;
  username: string;
  uri: string;
}

export const loginApp = createAction<RegistrationPayload>("auth/loginApp");

export const { setAuthData } = authSlice.actions;

export default authSlice.reducer;
