import 'yuki-createjs';
import 'babel-polyfill';
import Ball from './components/Ball';
import win from './constants/window';

window.onload = () => {
  const canvas = document.getElementById('main');
  canvas.width = win.width;
  canvas.height = win.height;
  const stage = new createjs.Stage(canvas);
  createjs.Ticker.setFPS(80);
  canvas.style.backgroundColor = win.style.backgroundColor;
  new Ball(stage);
};

