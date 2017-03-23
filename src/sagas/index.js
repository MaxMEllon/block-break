import { fork } from 'redux-saga/effects';
import ballSaga from './ballSaga';

export default function* rootSaga() {
  yield fork(ballSaga);
}
