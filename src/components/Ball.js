import store from '../store';
import { initialState } from '../reducers';
import binder from '../utils/binder';
import {
  moveToBall,
} from '../actions';

export default class Ball {
  constructor(stage) {
    this.stage = stage;
    this.updateTime = 4;
    this.state = { ...initialState.ball };
    binder(this);
    this.mount();
  }

  mount() {
    this.ball = new createjs.Shape();
    this.ball.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, this.state.size);
    this.ball.x = this.state.x;
    this.ball.y = this.state.y;
    this.stage.addChild(this.ball);
    this.mounted();
  }

  mounted() {
    this.updateComponent();
    store.subscribe(this.updateState);
    createjs.Ticker.addEventListener('tick', this.updateComponent);
    window.$$ball = this.ball;
  }

  updateComponent() {
    const state = store.getState();
    const { x, y, size } = this.state;
    this.ball.x = x;
    this.ball.y = y;
    this.ball.graphics.command.radius = size;
    this.stage.update();
    store.dispatch(moveToBall({ ball: state.ball }));
  }

  updateState() {
    const state = store.getState();
    this.setState(state.ball);
  }

  setState(nextState) {
    this.state = { ...nextState };
  }
}
