import { onActions } from "@/store/actions";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  Message,
  GroupBasicInfo,
  SendChatMessage,
  insertMessages,
  updateMessage,
  InsertChatMessages,
  InsertGroupChatMessages,
  SyncHavedReadLatestMessage,
  InitChatData,
  CreateGroup,
  JoinGroup,
  updateHaveReadUserLatestMessage,
  TargetMsg,
  UserInfo,
  updateMessagesStatus,
  addFriends,
  setHaveJoinGroups,
} from "@/features/chat/store";
import { all, call, put, select } from "redux-saga/effects";
import {
  sendMessage,
  syncChatMessages,
  deleteHavedSyncMessages,
  syncHavedReadLatestMessage,
  syncMessageStatus,
  searchUserResult,
} from "@/features/chat/services";
import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
import { handleFormatMessage } from "../utils";
export function* watchChatSaga() {
  yield onActions({
    [SendChatMessage.type]: handleSendChatMessage,
    [InsertChatMessages.type]: handleInsertChatMessage,
    [InsertGroupChatMessages.type]: handleInsertGroupChatMessage,
    [SyncHavedReadLatestMessage.type]: handleSyncHavedReadLatestMessage,
    [InitChatData.type]: handleInitChatData,
    [CreateGroup.type]: handleCreateGroup,
    [JoinGroup.type]: handleJoinGroup,
  });
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
    const { activeChatId, friends } = yield select(state => state.chat);
    const result: Message[] = yield call(syncChatMessages, activeChatId);
    if (!result || result.length === 0) {
      return;
    }
    // 检测邀请
    for (const message of result) {
      switch (message.type) {
        case MESSAGE_TYPE.joinGroupNotification:
          yield call(handleJoinGroup, {
            payload: message,
            type: JoinGroup.type,
          });
          break;
      }
    }

    const strangerIds: string[] = Array.from(
      new Set(result.map((msg: Message) => msg.fromId).filter((id: string) => !friends[id])),
    );

    const results: UserInfo[] = yield all(strangerIds.map(id => call(searchUserResult, id)));

    const newUserInfos = results.map((item: UserInfo) => {
      return { ...item, timestamp: Date.now() };
    });

    yield put(addFriends(newUserInfos));

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
// 创建群组
function* handleCreateGroup(action: PayloadAction<GroupBasicInfo>) {
  try {
    if (!action.payload) {
      return;
    }
    yield put(setHaveJoinGroups(action.payload));
    const { groupMembersDraft } = yield select(state => state.chat);

    const content = action.payload;

    const memberIds = Object.keys(groupMembersDraft || {});

    const messages = memberIds.map(id =>
      handleFormatMessage(id as string, content, MESSAGE_TYPE.joinGroupNotification),
    );

    yield all(
      messages.map(msg =>
        call(handleSendChatMessage, {
          payload: msg,
          type: SendChatMessage.type,
        }),
      ),
    );
  } catch (error: unknown) {
    console.error(error);
  }
}
// 接收群信息
function* handleInsertGroupChatMessage(action: PayloadAction<Message>) {
  try {
    if (!action.payload) {
      return;
    }
    const message: Message = action.payload;

    yield put(insertMessages([message]));
  } catch (error: unknown) {
    console.error(error);
  }
}

// 加入聊天群
function* handleJoinGroup(action: PayloadAction<Message>) {
  try {
    if (!action.payload) {
      return;
    }
    yield;
  } catch (error: unknown) {
    console.error(error);
  }
}
