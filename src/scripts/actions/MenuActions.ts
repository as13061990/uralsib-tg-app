import Loading from '../components/Loading';
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
const blue1 = require('../../assets/images/blue-1.png');
const blue2 = require('../../assets/images/blue-2.png');
const blue3 = require('../../assets/images/blue-3.png');
const blue4 = require('../../assets/images/blue-4.png');
const red1 = require('../../assets/images/red-1.png');
const red2 = require('../../assets/images/red-2.png');
const red3 = require('../../assets/images/red-3.png');
const red4 = require('../../assets/images/red-4.png');
const red5 = require('../../assets/images/red-5.png');
const ice = require('../../assets/images/ice.png');
const flame = require('../../assets/images/flame.png');
const progress = require('../../assets/images/progress.png');
const progressBg = require('../../assets/images/progress-bg.png');
const point = require('../../assets/images/point.png');
const pause = require('../../assets/images/pause.png');
const result = require('../../assets/images/result.png');
const dot = require('../../assets/images/dot.png');
const againBtn = require('../../assets/images/again-btn.png');
const prizeBtn = require('../../assets/images/prize-btn.png');
const wasted = require('../../assets/images/wasted.png');

class MenuActions {
  constructor(scene: Menu) {
    this.scene = scene;
  }

  private scene: Menu;
  private loading: boolean = false;

  public loadAssets(): void {
    if (this.loading === false) {
      this.loading = true;
      new Loading(this.scene);
    }

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
    this.scene.load.image('blue-1', blue1);
    this.scene.load.image('blue-2', blue2);
    this.scene.load.image('blue-3', blue3);
    this.scene.load.image('blue-4', blue4);
    this.scene.load.image('red-1', red1);
    this.scene.load.image('red-2', red2);
    this.scene.load.image('red-3', red3);
    this.scene.load.image('red-4', red4);
    this.scene.load.image('red-5', red5);
    this.scene.load.image('ice', ice);
    this.scene.load.image('flame', flame);
    this.scene.load.image('progress', progress);
    this.scene.load.image('progress-bg', progressBg);
    this.scene.load.image('point', point);
    this.scene.load.image('pause', pause);
    this.scene.load.image('result', result);
    this.scene.load.image('dot', dot);
    this.scene.load.image('again-btn', againBtn);
    this.scene.load.image('prize-btn', prizeBtn);
    this.scene.load.image('wasted', wasted);
  }

  public clickRulesBtn(): void {
    new Rules(this.scene);
  }

  public clickStartBtn(): void {
    if (!User.rules) {
      new Rules(this.scene, true);
    } else {
      this.scene.scene.start('Game');
    }
  }
}

export default MenuActions;