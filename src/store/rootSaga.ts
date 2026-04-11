import { all, fork } from "redux-saga/effects";
import { watchAuthSaga, watchChatSaga, watchUserSaga } from "@/features";
function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchChatSaga), fork(watchUserSaga)]);
}

export default rootSaga;
