import { fork } from 'redux-saga/effects';
import ballSaga from './ballSaga';
import barSaga from './barSaga';

export default function* rootSaga() {
  yield fork(ballSaga);
  yield fork(barSaga);
}
