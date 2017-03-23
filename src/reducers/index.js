import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import win from '../constants/window';
import * as actions from '../actions';

export const initialState = {
  ball: {
    x: 150,
    y: 400,
    dx: 4,
    dy: -4,
    size: 10,
  },
  bar: {
    x: (win.width / 2) - 50,
    y: win.height - 80,
    width: 100,
    height: 10,
  },
};

const ballReducer = createReducer({
  [actions.movedBall]: (state, payload) => {
    const { ball } = payload;
    return { ...ball };
  },
}, initialState.ball);

const barReducer = createReducer({
  [actions.movedBar]: (state, payload) => {
    const { bar } = payload;
    return { ...bar };
  },
}, initialState.bar);

export default combineReducers(
  {
    ball: ballReducer,
    bar: barReducer,
  },
);
