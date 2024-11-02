import { all, fork } from "redux-saga/effects";
import { watchcalculateIncomeTax } from "./calculator-saga";

const rootSaga = function* () {
  yield all([
    fork(watchcalculateIncomeTax),
    // Other forks
  ]);
};

export default rootSaga;