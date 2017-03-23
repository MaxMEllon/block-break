import { fork, take, put } from 'redux-saga/effects';
import win from '../constants/window';
import {
  moveLeftBar,
  moveRightBar,
  movedBar,
} from '../actions';

const $$$ = undefined;

function* moveLeft() {
  while (typeof $$$ === 'undefined') {
    const { payload } = yield take(moveLeftBar);
    const { bar } = payload;
    const nextBar = { ...bar };
    nextBar.x -= 50;
    if (nextBar.x < 0) nextBar.x = 0;
    if (nextBar.x + nextBar.width >= win.width) nextBar.x = win.width - nextBar.width;
    yield put(movedBar({ bar: nextBar }));
  }
}

function* moveRight() {
  while (typeof $$$ === 'undefined') {
    const { payload } = yield take(moveRightBar);
    const { bar } = payload;
    const nextBar = { ...bar };
    nextBar.x += 50;
    if (nextBar.x < 0) nextBar.x = 0;
    if (nextBar.x + nextBar.width >= win.width) nextBar.x = win.width - nextBar.width;
    yield put(movedBar({ bar: nextBar }));
  }
}

export default function* barSaga() {
  yield fork(moveLeft);
  yield fork(moveRight);
}
