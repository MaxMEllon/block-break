import { fork, take, put } from 'redux-saga/effects';
import win from '../constants/window';
import {
  moveToBall,
  movedBall,
} from '../actions';

const $$$ = undefined;

const overWidth = (x, dx, size) => {
  const nextX = dx * (size / 2);
  return x <= 0 - nextX || win.width <= x + nextX ? dx * -1 : dx;
};

const overHeight = (y, dy, size) => {
  const nextY = dy * (size / 2);
  return y <= 0 - nextY || win.height <= y + nextY ? dy * -1 : dy;
};

function* move() {
  while (typeof $$$ === 'undefined') {
    const { payload } = yield take(`${moveToBall}`);
    const { ball } = payload;
    const { size } = ball;
    const dx = overWidth(ball.x, ball.dx, size);
    const dy = overHeight(ball.y, ball.dy, size);
    const x = ball.x + ball.dx;
    const y = ball.y + ball.dy;
    yield put(movedBall({ ball: { x, y, dx, dy, size } }));
  }
}

export default function* ballSaga() {
  yield fork(move);
}
