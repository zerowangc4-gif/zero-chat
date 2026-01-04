import { onActions, BaseAction } from "@/store/actions";
import { loginApp, signIn } from "./authSlice";
import { put } from "redux-saga/effects";

export function* watchAuthSaga() {
  yield onActions({ [loginApp.type]: handleLoginApp });
}

function* handleLoginApp(action?: BaseAction): Generator {
  if (action) {
    yield put(signIn(action.payload));
  }
}
