import { all, fork } from "redux-saga/effects";
import { watchAuthSaga, watchChatSaga } from "@/features";
function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchChatSaga)]);
}

export default rootSaga;
