import { createAction, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserState, SetInputConfigPayload } from "./types";
const iniState: UserState = {
  inputConfig: {
    keyboardHeight: 0,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState: iniState,
  reducers: {
    setInputConfig(state, action: PayloadAction<SetInputConfigPayload>) {
      const { key, value } = action.payload;

      state.inputConfig[key] = value;
    },
  },
});

export const { setInputConfig } = userSlice.actions;

export const LogOut = createAction<string | undefined>("user/LogOut");

export default userSlice.reducer;
