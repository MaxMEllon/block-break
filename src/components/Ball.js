import _ from 'lodash';
import store from '../store';
import { initialState } from '../reducers';
import { moveToBall } from '../actions';
import binder from '../utils/binder';

export default class SampleCircle {
  constructor(stage) {
    this.stage = stage;
    this.updateTime = 10;
    this.state = {
      ...initialState.ball,
    };
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
    store.subscribe(this.shouldUpdateComponent);
    this.updateComponent();
    store.dispatch(moveToBall({ ball: this.state }));
  }

  shouldUpdateComponent() {
    const state = store.getState();
    if (this.$diffState(state.ball)) {
      this.$mergeState(state.ball);
      this.updateComponent();
      _.delay(() => store.dispatch(moveToBall({ ball: state.ball })), this.updateTime);
    }
  }

  updateComponent() {
    this.circle.x = this.state.x;
    this.circle.y = this.state.y;
    this.stage.update();
  }

  $mergeState(nextState) {
    this.state.x = nextState.x;
    this.state.y = nextState.y;
    this.state.dx = nextState.dx;
    this.state.dy = nextState.dy;
  }

  $diffState(nextState) {
    return !(
      this.state.x === nextState.x &&
      this.state.y === nextState.y &&
      this.state.dx === nextState.dx &&
      this.state.dy === nextState.dy
    );
  }
}
