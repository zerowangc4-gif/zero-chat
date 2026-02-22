import { t } from "i18next";
import { onActions, BaseAction } from "@/store/actions";
import { setAvatarSeed, updateUserAvatar } from "@/features/auth";
import { call, put } from "redux-saga/effects";
import { updateAvatar } from "@/features/profile";
import { Toast } from "@/components";

import { getErrorMessage } from "@/utils";

export function* watchProfileSaga() {
  yield onActions({ [updateUserAvatar.type]: handleUpdateAvatar });
}

function* handleUpdateAvatar(action?: BaseAction): Generator {
  if (!action?.payload) {
    throw new Error(t("common.server_error"));
  }
  try {
    const avatarSeed = action.payload;

    if (!avatarSeed) {
      throw new Error(t("common.server_error"));
    }

    const result = yield call(updateAvatar, avatarSeed);

    yield put(setAvatarSeed(result));
  } catch (e: unknown) {
    const message = getErrorMessage(e);
    Toast.error(message);
  }
}
