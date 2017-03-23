import _ from 'lodash';
import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import * as actions from '../actions';

export const initialState = {
  sample: { x: 0, y: 0 },
};

const sampleReducer = createReducer({
  [actions.afterSample]: (state, payload) => {
    const { sample } = payload;
    return _.merge(state.sample, { sample });
  },
}, initialState.sample);

export default combineReducers(
  {
    sample: sampleReducer,
  },
);
