import { createAction } from 'redux-act';

// ball
export const moveToBall = createAction('moveToBall');
export const movedBall = createAction('movedBall');

// bar
export const moveRightBar = createAction('moveRightBar');
export const moveLeftBar = createAction('moveLeftBar');
export const movedBar = createAction('movedBar');
