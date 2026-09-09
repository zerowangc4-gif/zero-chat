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
  InviteGroupMembers,
  SendRedPacket,
  updateHaveReadUserLatestMessage,
  TargetMsg,
  UserInfo,
  updateMessagesStatus,
  setFriends,
  setHaveJoinGroups,
  setGroupMembers,
  insertGroupMessages,
  ContentType,
  setFriendInfos,
  setWallet,
  WalletInfo,
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
  getWallet,
  sendRedPacket,
} from "@/features/chat/services";
import { addFriends, getAllFriendInfo } from "@/features/user";
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
    [InviteGroupMembers.type]: handleInviteGroupMembers,
    [SendRedPacket.type]: handleSendRedPacket,
    [SyncGroupChatMessages.type]: handleSyncGroupChatMessages,
  });
}

function* handleInitChatData() {
  yield call(handleGetAllFriendInfo);
  yield call(handleLoadWallet);
  yield call(handleInsertChatMessage);
  yield call(handleSyncGroupChatMessages);
  yield call(handleSyncMessageStatus);
}

function* handleLoadWallet() {
  try {
    const wallet: WalletInfo = yield call(getWallet);
    yield put(setWallet(wallet));
  } catch (error: unknown) {
    console.error(error);
  }
}

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

function* handleGetAllFriendInfo() {
  try {
    const result: UserInfo[] = yield call(getAllFriendInfo);
    yield put(setFriends(result));
    yield put(setFriendInfos(result));
  } catch (error: unknown) {
    console.error(error);
  }
}

function* handleInsertChatMessage() {
  try {
    const { activeChatId, friends } = yield select(state => state.chat);
    const result: Message[] = yield call(syncChatMessages, activeChatId);

    if (!result || result.length === 0) {
      return;
    }
    for (const message of result) {
      switch (message.type) {
        case MESSAGE_TYPE.joinGroupNotification: {
          const joinPrice = Number(message.content?.joinPrice || 0);
          if (joinPrice > 0) {
            break;
          }
          yield call(handleJoinGroup, {
            payload: { content: message.content },
            type: JoinGroup.type,
          });
          break;
        }
      }
    }

    const strangerIds: string[] = Array.from(
      new Set(result.map((msg: Message) => msg.fromId).filter((id: string) => !friends[id])),
    );

    if (strangerIds.length > 0) {
      const results: UserInfo[] = yield call(addFriends, strangerIds);

      if (results && results.length > 0) {
        const newUserInfos = results.map((item: UserInfo) => {
          return { ...item, alias: item.name, timestamp: Date.now() };
        });
        yield put(setFriends(newUserInfos));
      }
    }

    yield put(insertMessages(result));

    let latestMessage = result[result.length - 1];

    latestMessage = { ...latestMessage, status: MESSAGE_STATUS.SENT_TO_SERVER };

    yield call(deleteHavedSyncMessages, latestMessage);
  } catch (error: unknown) {
    console.error(error);
  }
}

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

function* handleCreateGroup(action: PayloadAction<GroupBasicInfo>) {
  try {
    if (!action.payload) {
      return;
    }
    yield put(setHaveJoinGroups(action.payload));
    const { groupMembersDraft } = yield select(state => state.chat);
    yield call(sendJoinInvites, action.payload, Object.keys(groupMembersDraft || {}));
  } catch (error: unknown) {
    console.error(error);
  }
}

function* sendJoinInvites(group: GroupBasicInfo, memberIds: string[]) {
  const content = group as ContentType;
  const messages = memberIds.map(id =>
    handleFormatMessage(id, content, MESSAGE_TYPE.joinGroupNotification),
  );

  yield all(
    messages.map(msg =>
      call(handleSendChatMessage, {
        payload: msg,
        type: SendChatMessage.type,
      }),
    ),
  );
}

function* handleInviteGroupMembers(action: PayloadAction<{ groupId: string; memberIds: string[] }>) {
  try {
    const { groupId, memberIds } = action.payload;
    const { haveJoinGroups } = yield select(state => state.chat);
    const group: GroupBasicInfo | undefined = haveJoinGroups[groupId];
    if (!group || !memberIds.length) {
      return;
    }
    yield call(sendJoinInvites, group, memberIds);
  } catch (error: unknown) {
    console.error(error);
  }
}

function* handleJoinGroup(action: PayloadAction<{ content: ContentType; paymentTxHash?: string }>) {
  try {
    if (!action.payload?.content) {
      return;
    }
    const address = action.payload.content.address;
    const { haveJoinGroups } = yield select(state => state.chat);

    if (!address || haveJoinGroups[address]) {
      return;
    }
    const result: GroupBasicInfo = yield call(joinGroup, address, {
      paymentTxHash: action.payload.paymentTxHash,
    });
    if (result?.address) {
      yield put(setHaveJoinGroups(result));
      yield call(handleLoadWallet);
    }
  } catch (error: unknown) {
    console.error(error);
  }
}

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

function* handleSendRedPacket(action: PayloadAction<Message>) {
  if (!action.payload) {
    return;
  }
  const message: Message = action.payload;
  const { haveJoinGroups } = yield select(state => state.chat);
  const sendToGroup = !!haveJoinGroups[message.toId];

  try {
    if (sendToGroup) {
      yield put(insertGroupMessages([message]));
    } else {
      yield put(insertMessages([message]));
    }
    const result: Message = yield call(
      sendRedPacket,
      message,
      Number(message.content.amount || 0),
      sendToGroup,
      {
        paymentTxHashes: message.content.paymentTxHashes,
        paymentTxHash: message.content.paymentTxHash,
      },
    );
    yield put(updateMessage(result));
    yield call(handleLoadWallet);
  } catch (error: unknown) {
    yield put(updateMessage({ ...message, status: MESSAGE_STATUS.FAILED }));
    console.error(error);
  }
}

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
