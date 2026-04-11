import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Tokens } from "./types";

const iniState: Tokens = {
  accessToken: "",
  refreshToken: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState: iniState,
  reducers: {
    setTokens: (_state, action: PayloadAction<Tokens>) => {
      return action.payload;
    },
  },
});

export const RegisterAndLogin = createAction<string | undefined>("auth/RegisterAndLogin");

export const { setTokens } = authSlice.actions;

export default authSlice.reducer;
