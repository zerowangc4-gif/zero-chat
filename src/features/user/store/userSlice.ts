import { createAction, createSlice } from "@reduxjs/toolkit";

const iniState = {};

const userSlice = createSlice({
  name: "user",
  initialState: iniState,
  reducers: {},
});

export const LogOut = createAction<string | undefined>("user/LogOut");

export default userSlice.reducer;
