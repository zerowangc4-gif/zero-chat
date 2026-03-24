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
  InitChatData,
  updateHaveReadUserLatestMessage,
  TargetMsg,
  updateMessagesStatus,
} from "@/features/chat/store";
import { all, call, put, select } from "redux-saga/effects";
import {
  sendMessage,
  syncChatMessages,
  deleteHavedSyncMessages,
  syncHavedReadLatestMessage,
  getContacts,
  syncMessageStatus,
} from "@/features/chat/services";
import { MESSAGE_STATUS } from "@/constants";

export function* watchChatSaga() {
  yield onActions({
    [fetchContacts.type]: handleGetContacts,
    [SendChatMessage.type]: handleSendChatMessage,
    [InsertChatMessages.type]: handleInsertChatMessage,
    [SyncHavedReadLatestMessage.type]: handleSyncHavedReadLatestMessage,
    [InitChatData.type]: handleInitChatData,
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

// 上线时初始化状态
function* handleInitChatData() {
  yield call(handleInsertChatMessage);
  yield call(handleSyncMessageStatus);
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
    const { activeChatId } = yield select(state => state.chat);
    const result: Message[] = yield call(syncChatMessages, activeChatId);
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

// 同步离线时的信息状态
function* handleSyncMessageStatus() {
  try {
    const targetMsgs: TargetMsg[] = yield call(syncMessageStatus);

    if (targetMsgs?.length > 0) {
      yield all(targetMsgs.map(item => put(updateMessagesStatus(item))));
    }
  } catch (error: unknown) {
    console.error(error);
  }
}
