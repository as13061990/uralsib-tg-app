import Rules from '../components/Rules';
import User from '../data/User';
import Menu from '../scenes/Menu';

const gradient = require('../../assets/images/gradient.png');
const menuLogo = require('../../assets/images/menu-logo.png');
const rulesBtn = require('../../assets/images/rules-btn.png');
const startBtn = require('../../assets/images/start-btn.png');
const close = require('../../assets/images/close.png');
const bg = require('../../assets/images/bg.jpg');
const player = require('../../assets/images/player.png');
const pixel = require('../../assets/images/pixel.png');
const platform = require('../../assets/images/platform.png');
const platformTile = require('../../assets/images/platform-tile.png');

class MenuActions {
  constructor(scene: Menu) {
    this.scene = scene;
  }

  private scene: Menu;

  public loadAssets(): void {
    const camera = this.scene.cameras.main;
    const loading = this.scene.add.sprite(camera.centerX, camera.centerY - 100, 'loading');
    const text = this.scene.add.text(camera.centerX, camera.centerY + 50, '0%', {
      font: '30px stolzl_medium',
      color: '#6850B9'
    }).setOrigin(0.5, 0.5);

    this.scene.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText(percent + '%');
    }, this);
    this.scene.load.on('complete', (): void => {
      this.scene.load.removeAllListeners();
      loading.destroy();
      text.destroy();
    }, this);

    this.scene.load.image('gradient', gradient);
    this.scene.load.image('menu-logo', menuLogo);
    this.scene.load.image('rules-btn', rulesBtn);
    this.scene.load.image('start-btn', startBtn);
    this.scene.load.image('close', close);
    this.scene.load.image('bg', bg);
    this.scene.load.image('pixel', pixel);
    this.scene.load.image('platform', platform);
    this.scene.load.image('platform-tile', platformTile);
    this.scene.load.spritesheet('player', player, { frameWidth: 150, frameHeight: 199 });
  }

  public clickRulesBtn(): void {
    new Rules(this.scene);
  }

  public clickStartBtn(): void {
    if (!User.rules) {
      new Rules(this.scene);
    } else {
      this.scene.scene.start('Game');
    }
  }
}

export default MenuActions;