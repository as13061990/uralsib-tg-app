import './types/interfaces';
import '../assets/css/style.css';
import * as Phaser from 'phaser';
import Boot from './scenes/Boot';
import Game from './scenes/Game';
import Menu from './scenes/Menu';
import Modal from './scenes/Modal';
import Settings from './data/Settings';

const gcd = (num1: number, num2: number): number => {
  while (num1 && num2) num1 > num2 ? num1 %= num2 : num2 %= num1;
  num1 += num2;
  return num1;
}

window.onload = (): void => {
  setTimeout((): void => {
    const root: HTMLElement = document.querySelector('#root');
    const clientHeight = Math.round(document.body.clientHeight);
    const clientWidth = Math.round(document.body.clientWidth);
    let canvasWidth = Math.round((Settings.sizes.minHeight * clientWidth) / clientHeight);
    let canvasHeight = Math.round((Settings.sizes.minWidth * clientHeight) / clientWidth);
    let width = 0;
    let height = 0;
    
    if (canvasHeight > Settings.sizes.maxHeight) canvasHeight = Settings.sizes.maxHeight;
    else if (canvasHeight < Settings.sizes.minHeight) canvasHeight = Settings.sizes.minHeight;
    
    if (canvasWidth > Settings.sizes.maxWidth) canvasWidth = Settings.sizes.maxWidth;
    else if (canvasWidth < Settings.sizes.minWidth) canvasWidth = Settings.sizes.minWidth;
 
    const x = canvasWidth / gcd(canvasHeight, canvasWidth);
    const y = canvasHeight / gcd(canvasHeight, canvasWidth);
  
    if (clientHeight / y > clientWidth / x) {
      width = clientWidth;
      height = clientWidth / x * y;
    } else {
      width = clientHeight / y * x;
      height = clientHeight;
    }
    root.style.height = height + 'px';
    root.style.width = width + 'px';
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.CANVAS,
      width: canvasWidth,
      height: canvasHeight,
      parent: 'root',
      physics: {
        default: 'arcade',
        // arcade: { debug: true }
      },
      render: { transparent: true },
      scene: [ Boot, Menu, Game, Modal ]
    }
    const game = new Phaser.Game(config);
    window.addEventListener('resize', (): void => {
      const clientHeight = Math.round(document.body.clientHeight);
      const clientWidth = Math.round(document.body.clientWidth);

      if (clientHeight / y > clientWidth / x) {
        width = clientWidth;
        height = clientWidth / x * y;
      } else {
        width = clientHeight / y * x;
        height = clientHeight;
      }
      root.style.height = height + 'px';
      root.style.width = width + 'px';
      game.scale.resize(canvasWidth, canvasHeight);
    }, false);
  }, 100);
}