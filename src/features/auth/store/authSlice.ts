import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: string;
  address: string;
  publicKey: string;
  username: string;
}

export interface AuthData {
  user: User;
  accessToken: string;
  refreshToken: string;
}
export interface TokensType {
  accessToken: string;
  refreshToken: string;
}
const authData = {
  user: {
    id: "",
    address: "",
    publicKey: "",
    username: "",
  },
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: authData,
  reducers: {
    setAuthData: (state, action: PayloadAction<AuthData>) => {
      const { user, accessToken, refreshToken } = action.payload;
      state.user = { ...user };
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    },
    clearAuthData: _state => {
      return authData;
    },
    setTokens: (state, action: PayloadAction<TokensType>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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

export const { setAuthData, clearAuthData, setTokens } = authSlice.actions;

export default authSlice.reducer;
