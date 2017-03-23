import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import * as actions from '../actions';
import win from '../constants/window';

export const initialState = {
  ball: {
    x: 150,
    y: 400,
    dx: 4,
    dy: -4,
    size: 10,
  },
};

const overWidth = (x, dx, size) => {
  const nextX = dx * (size / 2);
  return x <= 0 - nextX || win.width <= x + nextX ? dx * -1 : dx;
};

const overHeight = (y, dy, size) => {
  const nextY = dy * (size / 2);
  return y <= 0 - nextY || win.height <= y + nextY ? dy * -1 : dy;
};

const ballReducer = createReducer({
  [actions.movedBall]: (state, payload) => {
    const { ball } = payload;
    const { size } = ball;
    const dx = overWidth(ball.x, ball.dx, size);
    const dy = overHeight(ball.y, ball.dy, size);
    const x = ball.x + ball.dx;
    const y = ball.y + ball.dy;
    return { x, y, dx, dy, size };
  },
}, initialState.ball);

export default combineReducers(
  {
    ball: ballReducer,
  },
);
