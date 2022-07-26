import Game from '../scenes/Game';
import Platform from '../components/Platform';

const bg = require('../../assets/images/bg.jpg');
const player = require('../../assets/images/player.png');
const pixel = require('../../assets/images/pixel.png');
const platform = require('../../assets/images/platform.png');
const platformTile = require('../../assets/images/platform-tile.png');

class GameActions {
  constructor(scene: Game) {
    this.scene = scene;
  }

  private scene: Game;

  public loadAssets(): void {
    this.scene.load.image('bg', bg);
    this.scene.load.image('pixel', pixel);
    this.scene.load.image('platform', platform);
    this.scene.load.image('platform-tile', platformTile);
    this.scene.load.spritesheet('player', player, { frameWidth: 150, frameHeight: 199 });
  }

  public startPlatforms(): void {
    const first = new Platform(this.scene, 500, true);
    this.scene.platforms.add(first);
    
    const platform = new Platform(this.scene, 300, true);
    this.scene.platforms.add(platform);
    
    this.scene.time.addEvent({ delay: 500, callback: (): void => {
      const platform = new Platform(this.scene, 300);
      this.scene.platforms.add(platform);
    }, loop: false });

    this.scene.time.addEvent({ delay: 1500, callback: (): void => {
      const platform = new Platform(this.scene, 300);
      this.scene.platforms.add(platform);
    }, loop: true });
  }
}

export default GameActions;