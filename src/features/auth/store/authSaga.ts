import { t } from "i18next";
import { onActions, BaseAction } from "@/store/actions";
import { loginApp, setAuthData } from "./authSlice";
import { call, put } from "redux-saga/effects";
import { registerAndLogin } from "../services";
import { Toast } from "@/components";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";

export function* watchAuthSaga() {
  yield onActions({ [loginApp.type]: handleLoginApp });
}

function* handleLoginApp(action?: BaseAction): Generator {
  if (!action?.payload) {
    return;
  }
  try {
    const { address, publicKey, username, uri } = action.payload;

    if (!address || !publicKey || !username || !uri) {
      const message = t("auth.errors_wallet_gen_failed");
      throw new Error(message);
    }

    const result = yield call(registerAndLogin, address, publicKey, username);

    yield call(CameraRoll.saveAsset, uri, { type: "photo", album: "ZeroTrace" });

    yield put(setAuthData(result));
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : t("auth.errors_wallet_gen_failed");
    Toast.error(message);
  }
}
