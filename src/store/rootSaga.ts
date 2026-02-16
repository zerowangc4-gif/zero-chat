import { all, fork } from "redux-saga/effects";
import { watchAuthSaga, watchProfileSaga } from "@/features";
function* rootSaga() {
  yield all([fork(watchAuthSaga), fork(watchProfileSaga)]);
}

export default rootSaga;
