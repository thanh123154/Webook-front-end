import { all, fork } from "@redux-saga/core/effects";
import { watchDoAuth } from "./authSagas";
import { watchDoListing } from "./listingSagas";

export default function* rootSaga() {
  yield all([fork(watchDoAuth), fork(watchDoListing)]);
}
