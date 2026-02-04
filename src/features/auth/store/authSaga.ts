import { t } from "i18next";
import { onActions, BaseAction } from "@/store/actions";
import { loginApp, setAuthData } from "./authSlice";
import { call, put } from "redux-saga/effects";
import { registerAndLogin, getNonce } from "../services";
import { Toast } from "@/components";
import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { getErrorMessage } from "@/utils";
import { getPrivateKey, signMessage } from "@/features/wallet";

export function* watchAuthSaga() {
  yield onActions({ [loginApp.type]: handleLoginApp });
}

function* handleLoginApp(action?: BaseAction): Generator {
  if (!action?.payload) {
    throw new Error(t("auth.error_generation_failed"));
  }
  try {
    const { address, publicKey, username, uri } = action.payload;

    if (!address || !publicKey || !username || !uri) {
      throw new Error(t("auth.error_generation_failed"));
    }

    const authSlogan = yield call(getNonce, address);

    const privateKey = yield call(getPrivateKey);

    const signature = yield call(signMessage, privateKey, authSlogan);

    const result = yield call(registerAndLogin, address, publicKey, username, signature);

    yield call(CameraRoll.saveAsset, uri, { type: "photo", album: "ZeroTrace" });

    yield put(setAuthData(result));
  } catch (e: unknown) {
    const message = getErrorMessage(e);
    Toast.error(message);
  }
}
