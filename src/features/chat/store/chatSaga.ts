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
  SyncHavedReadLatestMessage,
  updateHaveReadUserLatestMessage,
} from "@/features/chat/store";
import { call, put } from "redux-saga/effects";
import {
  sendMessage,
  syncChatMessages,
  deleteHavedSyncMessages,
  syncHavedReadLatestMessage,
  getContacts,
} from "@/features/chat/services";
import { MESSAGE_STATUS } from "@/constants";

export function* watchChatSaga() {
  yield onActions({
    [fetchContacts.type]: handleGetContacts,
    [SendChatMessage.type]: handleSendChatMessage,
    [InsertChatMessages.type]: handleInsertChatMessage,
    [SyncHavedReadLatestMessage.type]: handleSyncHavedReadLatestMessage,
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
    const result: Message[] = yield call(syncChatMessages);
    if (!result || result.length === 0) {
      return;
    }
    yield put(insertMessages(result));

    yield call(deleteHavedSyncMessages, result[result.length - 1]);
  } catch (error: unknown) {
    console.error(error);
  }
}

// 同步已经读过的最新信息
function* handleSyncHavedReadLatestMessage(action: PayloadAction<Message>) {
  try {
    if (!action.payload) {
      return;
    }
    const message: Message = action.payload;
    const latestMessage: Message = yield call(syncHavedReadLatestMessage, message);
    yield put(updateHaveReadUserLatestMessage(latestMessage));
  } catch (error: unknown) {
    console.error(error);
  }
}
