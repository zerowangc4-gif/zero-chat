import { onActions } from "@/store/actions";
import { PayloadAction } from "@reduxjs/toolkit";

import {
  Message,
  GroupBasicInfo,
  SendChatMessage,
  SendGroupMessage,
  insertMessages,
  updateMessage,
  InsertChatMessages,
  SyncHavedReadLatestMessage,
  SyncGroupChatMessages,
  InitChatData,
  CreateGroup,
  JoinGroup,
  updateHaveReadUserLatestMessage,
  TargetMsg,
  UserInfo,
  updateMessagesStatus,
  addFriends,
  setHaveJoinGroups,
  setGroupMembers,
  insertGroupMessages,
} from "@/features/chat/store";
import { all, call, put, select } from "redux-saga/effects";
import {
  sendMessage,
  syncChatMessages,
  deleteHavedSyncMessages,
  syncHavedReadLatestMessage,
  syncMessageStatus,
  searchUserResult,
  joinGroup,
  syncGroupChatMessages,
  sendGroupMessage,
} from "@/features/chat/services";
import { MESSAGE_STATUS, MESSAGE_TYPE } from "@/constants";
import { handleFormatMessage } from "../utils";
export function* watchChatSaga() {
  yield onActions({
    [SendChatMessage.type]: handleSendChatMessage,
    [SendGroupMessage.type]: handleSendGroupMessage,
    [InsertChatMessages.type]: handleInsertChatMessage,
    [SyncHavedReadLatestMessage.type]: handleSyncHavedReadLatestMessage,
    [InitChatData.type]: handleInitChatData,
    [CreateGroup.type]: handleCreateGroup,
    [JoinGroup.type]: handleJoinGroup,
    [SyncGroupChatMessages.type]: handleSyncGroupChatMessages,
  });
}

// 上线时初始化状态
function* handleInitChatData() {
  yield call(handleInsertChatMessage);
  yield call(handleSyncGroupChatMessages);
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

    let latestMessage = result[result.length - 1];

    latestMessage = { ...latestMessage, status: MESSAGE_STATUS.SENT_TO_SERVER };

    yield call(deleteHavedSyncMessages, latestMessage);
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

// 加入聊天群
function* handleJoinGroup(action: PayloadAction<Message>) {
  try {
    if (!action.payload) {
      return;
    }
    const { address } = action.payload.content;
    const { haveJoinGroups } = yield select(state => state.chat);

    if (!address || haveJoinGroups[address]) {
      return;
    }
    const result = yield call(joinGroup, address);
    yield put(setHaveJoinGroups(result));
  } catch (error: unknown) {
    console.error(error);
  }
}

// 发送群信息
function* handleSendGroupMessage(action: PayloadAction<Message>) {
  if (!action.payload) {
    return;
  }
  const message: Message = action.payload;

  try {
    yield put(insertGroupMessages([message]));
    const result: Message = yield call(sendGroupMessage, message);
    yield put(updateMessage(result));
  } catch (error: unknown) {
    yield put(updateMessage({ ...message, status: MESSAGE_STATUS.FAILED }));
    console.error(error);
  }
}

// 同步群离线信息
function* handleSyncGroupChatMessages() {
  try {
    const { activeChatId, groupMembers } = yield select(state => state.chat);
    const messages: Message[] = yield call(syncGroupChatMessages, activeChatId);

    if (!messages || messages.length === 0) {
      return;
    }

    const strangerIds: string[] = Array.from(
      new Set(messages.map((msg: Message) => msg.fromId).filter((id: string) => !groupMembers[id])),
    );

    const results: UserInfo[] = yield all(strangerIds.map(id => call(searchUserResult, id)));

    yield put(setGroupMembers(results));

    yield put(insertGroupMessages(messages));

    let latestMessage = messages[messages.length - 1];

    latestMessage = { ...latestMessage, status: MESSAGE_STATUS.SENT_TO_SERVER };

    yield call(deleteHavedSyncMessages, latestMessage);
  } catch (error: unknown) {
    console.error(error);
  }
}
