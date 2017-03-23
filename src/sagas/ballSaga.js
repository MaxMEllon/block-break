import { take, put } from 'redux-saga/effects';
import {
  moveToBall,
  movedBall,
} from '../actions';

const $$$ = undefined;

export default function* ballSaga() {
  while (typeof $$$ === 'undefined') {
    const { payload } = yield take(`${moveToBall}`);
    yield put(movedBall({ ball: payload.ball }));
  }
}
