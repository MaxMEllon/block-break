import store from '../store';
import { sample } from '../actions';
import binder from '../utils/binder';

export default class SampleCircle {
  constructor(stage) {
    this.stage = stage;
    this.state = {
      x: 100,
      y: 100,
    };
    binder(this);
    this.mount();
  }

  mount() {
    this.circle = new createjs.Shape();
    this.circle.graphics.beginFill('DeepSkyBlue').drawCircle(0, 0, 50);
    this.circle.x = this.state.x;
    this.circle.y = this.state.y;
    this.circle.addEventListener('click', this.handleClick);
    this.stage.addChild(this.circle);
    this.mounted();
  }

  mounted() {
    store.subscribe(this.shouldUpdateComponent);
    this.updateComponent();
  }

  shouldUpdateComponent() {
    const state = store.getState();
    if (this.$diffState(state.sample)) {
      this.$mergeState(state.sample);
      this.updateComponent();
    }
  }

  updateComponent() {
    this.circle.x = this.state.x;
    this.circle.y = this.state.y;
    this.stage.update();
  }

  handleClick() {
    store.dispatch(sample());
  }

  $mergeState(nextState) {
    this.state.x = nextState.x;
    this.state.y = nextState.y;
  }

  $diffState(nextState) {
    return !(this.state.x === nextState.x && this.state.y === nextState.y);
  }
}
