import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthData, TokensType, LoginInfo } from "./types";

const authData = {
  user: {
    address: "",
    publicKey: "",
    username: "",
    avatarSeed: "",
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

export const loginApp = createAction<LoginInfo>("auth/loginApp");

export const { setAuthData, clearAuthData, setTokens } = authSlice.actions;

export default authSlice.reducer;
