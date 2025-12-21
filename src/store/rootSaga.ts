import { all, fork } from "redux-saga/effects";
import { watchAuthSaga } from "@/features/auth";
function* rootSaga() {
  yield all([fork(watchAuthSaga)]);
}

export default rootSaga;
