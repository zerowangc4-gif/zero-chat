import { onActions } from "@/store/actions";
import { LogOut } from "./userSlice";
import { put } from "redux-saga/effects";
import { setTokens } from "@/features/auth";
import { clearChatData } from "@/features/chat";

export function* watchUserSaga() {
  yield onActions({ [LogOut.type]: handleLogOut });
}

function* handleLogOut() {
  try {
    yield put(clearChatData());
    yield put(setTokens({ accessToken: "", refreshToken: "" }));
  } catch (e: unknown) {
    console.error(e);
  }
}
