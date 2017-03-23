import _ from 'lodash';
import store from '../store';
import { initialState } from '../reducers';
import binder from '../utils/binder';
import {
  moveLeftBar,
  moveRightBar,
} from '../actions';

let prevDone = true;

export default class Bar {
  constructor(stage) {
    this.stage = stage;
    this.state = { ...initialState.bar };
    binder(this);
    this.mount();
  }

  mount() {
    const { x, y, width, height } = this.state;
    this.bar = new createjs.Shape();
    this.bar.graphics.beginStroke('green');
    this.bar.graphics.beginFill('green');
    this.bar.graphics.rect(x, y, width, height);
    this.stage.addChild(this.bar);
    this.mounted();
  }

  setKeyBoard() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case 37: // LEFT
          if (prevDone) store.dispatch(moveLeftBar({ bar: this.state }));
          prevDone = false;
          _.delay(() => (prevDone = true), 100);
          break;
        case 39: // RIGHT
          store.dispatch(moveRightBar({ bar: this.state }));
          prevDone = false;
          _.delay(() => (prevDone = true), 100);
          break;
        default:
          break;
      }
    });
  }

  mounted() {
    this.updateComponent();
    store.subscribe(this.updateComponent);
    this.setKeyBoard();
    window.$$bar = this.bar;
  }

  updateComponent() {
    const state = store.getState();
    this.setState(state.bar);
    const { x, y, width, height } = this.state;
    this.bar.graphics.command.x = x;
    this.bar.graphics.command.y = y;
    this.bar.graphics.command.w = width;
    this.bar.graphics.command.h = height;
    this.stage.update();
  }

  setState(nextState) {
    this.state = { ...nextState };
  }
}
