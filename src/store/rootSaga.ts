import { all, fork } from "redux-saga/effects";
import { watchAuthSaga, watchChatSaga, watchProfileSaga } from "@/features";
function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchChatSaga), fork(watchProfileSaga)]);
}

export default rootSaga;
