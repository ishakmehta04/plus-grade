import { all, fork } from "redux-saga/effects";
import { watchCalculateIncomeTax } from "./calculator-saga";

const rootSaga = function* () {
  yield all([
    fork(watchCalculateIncomeTax),
  ]);
};

export default rootSaga;