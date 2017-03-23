import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import * as actions from '../actions';

export const initialState = {
  ball: {
    x: 150,
    y: 400,
    dx: 4,
    dy: -4,
    size: 10,
  },
};

const ballReducer = createReducer({
  [actions.movedBall]: (state, payload) => {
    const { ball } = payload;
    return { ...ball };
  },
}, initialState.ball);

export default combineReducers(
  {
    ball: ballReducer,
  },
);
