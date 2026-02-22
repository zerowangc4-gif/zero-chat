import { onActions } from "@/store/actions";
import { fetchContacts, setContacts } from "./chatSlice";
import { call, put } from "redux-saga/effects";
import { getContacts } from "@/features/chat";
import { Toast } from "@/components";

import { getErrorMessage } from "@/utils";

export function* watchChatSaga() {
  yield onActions({ [fetchContacts.type]: handleGetContacts });
}

function* handleGetContacts(): Generator {
  try {
    const contacts = yield call(getContacts);
    yield put(setContacts(contacts));
  } catch (e: unknown) {
    const message = getErrorMessage(e);
    Toast.error(message);
  }
}
