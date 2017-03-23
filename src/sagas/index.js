import { fork, take, put } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  sample,
  afterSample,
} from '../actions';

const $$$ = undefined;

function* sampleSaga() {
  while (typeof $$$ === 'undefined') {
    yield take(`${sample}`);
    yield delay(100);
    const x = (Math.random() * 100) + 50;
    const y = (Math.random() * 100) + 50;
    yield put(afterSample({ sample: { x, y } }));
  }
}

export default function* rootSaga() {
  yield fork(sampleSaga);
}
