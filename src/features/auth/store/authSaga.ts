import { t } from "i18next";
import { PayloadAction } from "@reduxjs/toolkit";
import { onActions } from "@/store/actions";
import { Login, setTokens } from "./authSlice";
import { call, put, select } from "redux-saga/effects";
import { registerAndLogin, getNonce } from "../services";
import { Toast } from "@/components";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { signWithStoredWallet } from "@/features/wallet";

export function* watchAuthSaga() {
  yield onActions({ [Login.type]: handleLogin });
}

function* handleLogin(action: PayloadAction<string>) {
  const url = action.payload;

  try {
    const { address, publicKey, username } = yield select(state => state.chat.user);

    if (!url || !address || !publicKey || !username) {
      throw new Error(t("auth.error_generation_failed"));
    }

    const authSlogan = yield call(getNonce, address);

    const signature = yield call(signWithStoredWallet, authSlogan);

    const result = yield call(registerAndLogin, address, publicKey, username, signature);

    yield call(CameraRoll.saveAsset, url, { type: "photo", album: "ZeroTrace" });

    yield put(setTokens(result));
  } catch (e: unknown) {
    console.error(e);
    Toast.error(t("auth.error_generation_failed"));
  }
}
