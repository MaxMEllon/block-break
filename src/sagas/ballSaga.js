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
    let dx = overWidth(ball.x, ball.dx, size);
    let dy = overHeight(ball.y, ball.dy, size);
    let x = ball.x + ball.dx;
    let y = ball.y + ball.dy;
    if (window.$$bar && window.$$ball) {
      const point = window.$$ball.localToLocal(0, 0, window.$$bar);
      const isHit = window.$$bar.hitTest(point.x, point.y);
      if (isHit) {
        dx = Math.random() > 0.5 ? dx * -1 : dx;
        dy *= -1;
        x = ball.x + dx;
        y = ball.y + dy;
      }
    }
    yield put(movedBall({ ball: { x, y, dx, dy, size } }));
  }
}

function* hit() {
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
