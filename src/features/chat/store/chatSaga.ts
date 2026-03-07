import { onActions } from "@/store/actions";
import { PayloadAction } from "@reduxjs/toolkit";
import {
  Message,
  fetchContacts,
  setContacts,
  SendChatMessage,
  insertMessages,
  updateMessage,
  InsertChatMessages,
  updateSyncUserMsgSeqNum,
} from "@/features/chat/store";
import { call, put, select } from "redux-saga/effects";
import { sendMessage, syncChatMessages, deleteHavedSyncMessages, getContacts } from "@/features/chat/services";
import { MESSAGE_STATUS } from "@/constants";

export function* watchChatSaga() {
  yield onActions({
    [fetchContacts.type]: handleGetContacts,
    [SendChatMessage.type]: handleSendChatMessage,
    [InsertChatMessages.type]: handleInsertChatMessage,
  });
}

function* handleGetContacts(): Generator {
  try {
    const contacts = yield call(getContacts);
    yield put(setContacts(contacts));
  } catch (error: unknown) {
    console.error(error);
  }
}

// 发送信息
function* handleSendChatMessage(action: PayloadAction<Message>) {
  if (!action.payload) {
    return;
  }
  const message: Message = action.payload;
  try {
    yield put(insertMessages([message]));
    const result: Message = yield call(sendMessage, message);
    yield put(updateMessage(result));
  } catch (error: unknown) {
    yield put(updateMessage({ ...message, status: MESSAGE_STATUS.FAILED }));
    console.error(error);
  }
}

// 同步信息
function* handleInsertChatMessage() {
  try {
    const { syncUserMsgSeqNum } = yield select(state => state.chat);
    const result: Message[] = yield call(syncChatMessages, syncUserMsgSeqNum);
    if (!result || result.length === 0) {
      return;
    }
    yield put(insertMessages(result));

    const latestSyncUserMsgSeqNum = yield call(deleteHavedSyncMessages, result[result.length - 1]);
    yield put(updateSyncUserMsgSeqNum(latestSyncUserMsgSeqNum));
  } catch (error: unknown) {
    console.error(error);
  }
}
