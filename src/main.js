import 'yuki-createjs';
import 'babel-polyfill';
import SampleCircle from './components/SampleCircle';

window.onload = () => {
  const canvas = document.getElementById('main');
  const stage = new createjs.Stage(canvas);
  new SampleCircle(stage);
};

