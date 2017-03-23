import { createAction } from 'redux-act';

// ball
export const moveToBall = createAction('moveToBall');
export const movedBall = createAction('movedBall');

export const increaseBallSize = createAction('increaseBallSize');
export const decreaseBallSize = createAction('decreaseBallSize');
export const changedBallSize = createAction('changedBallSize');
