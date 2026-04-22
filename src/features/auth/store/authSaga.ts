import { t } from "i18next";
import { PayloadAction } from "@reduxjs/toolkit";
import { onActions } from "@/store/actions";
import { RegisterAndLogin, setTokens } from "./authSlice";
import { call, put, select } from "redux-saga/effects";
import { registerAndLogin, getNonce } from "../services";
import { Toast } from "@/components";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { signWithStoredWallet } from "@/features/wallet";
import { setUserInfo } from "@/features/chat";
import { AuthResult } from "./types";

export function* watchAuthSaga() {
  yield onActions({ [RegisterAndLogin.type]: handleLogin });
}

function* handleLogin(action: PayloadAction<string | undefined>) {
  try {
    const { address, publicKey, name } = yield select(state => state.chat.user);

    if (!address || !publicKey || !name) {
      throw new Error(t("auth.error_generation_failed"));
    }

    const authSlogan = yield call(getNonce, address);

    const signature = yield call(signWithStoredWallet, authSlogan);

    const result: AuthResult = yield call(registerAndLogin, address, publicKey, name, signature);

    if (action.payload) {
      yield call(CameraRoll.saveAsset, action.payload, { type: "photo", album: "ZeroTrace" });
    }

    yield put(setTokens(result.tokens));

    yield put(setUserInfo(result.userInfo));
  } catch (e: unknown) {
    console.error(e);
    Toast.error(t("auth.error_generation_failed"));
  }
}
