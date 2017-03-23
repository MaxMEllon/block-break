import store from '../store';
import { initialState } from '../reducers';
import binder from '../utils/binder';
import {
  moveToBall,
} from '../actions';

export default class SampleCircle {
  constructor(stage) {
    this.stage = stage;
    this.updateTime = 4;
    this.state = { ...initialState.ball };
    binder(this);
    this.mount();
  }

  mount() {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, this.state.size);
    this.circle.x = this.state.x;
    this.circle.y = this.state.y;
    this.stage.addChild(this.circle);
    this.mounted();
  }

  mounted() {
    this.updateComponent();
    store.subscribe(this.updateState);
    createjs.Ticker.addEventListener('tick', this.updateComponent);
  }

  updateComponent() {
    const state = store.getState();
    const { x, y, size } = this.state;
    this.circle.x = x;
    this.circle.y = y;
    this.circle.graphics.command.radius = size;
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
