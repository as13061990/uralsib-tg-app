import Game from '../scenes/Game';
import Platform from '../components/Platform';
import Zone from '../components/Zone';

const bg = require('../../assets/images/bg.jpg');
const player = require('../../assets/images/player.png');
const pixel = require('../../assets/images/pixel.png');
const platform = require('../../assets/images/platform.png');
const platformTile = require('../../assets/images/platform-tile.png');

const MAX_JUMP = 100; // абстрактное число максимального прыжка
const MIN_INDENT = 50; // минимально расстояние для следующей платформы
const TOP_INDENT = 300; // верхняя граница отступа для платформы
const BOTTOM_INDENT = 100; // нижняя граница отступа для платформы
const DISTANCE = 400 // расстояние между платформами

class GameActions {
  constructor(scene: Game) {
    this.scene = scene;
  }

  private scene: Game;
  private platforms: Phaser.Time.TimerEvent;

  public loadAssets(): void {
    this.scene.load.image('bg', bg);
    this.scene.load.image('pixel', pixel);
    this.scene.load.image('platform', platform);
    this.scene.load.image('platform-tile', platformTile);
    this.scene.load.spritesheet('player', player, { frameWidth: 150, frameHeight: 199 });
  }

  public startPlatforms(): void {
    this.createPlatform(true);

    this.platforms = this.scene.time.addEvent({ delay: 10, callback: (): void => {
      this.createPlatform();
    }, loop: true });
  }

  public createClickZone(): void {
    const camera = this.scene.cameras.main;
    const zone = new Zone(this.scene, camera.centerX, camera.centerY, camera.width, camera.height);
    zone.downCallback = (): void => this.scene.player.jump();
  }

  private createPlatform(first: boolean = false): void {
    const size = first ? 500 : Phaser.Math.Between(200, 400);
    const position = this.getPlatformPosition(size, first);
    
    if (position === null) return;
    const platform = new Platform(this.scene, position.x, position.y, size);
    this.scene.platforms.add(platform);
  }

  private getPlatformPosition(size: number, start: boolean = false): Iposition {
    const last: Platform = this.scene.platforms.getChildren()[this.scene.platforms.getLength() - 1] as Platform;

    if (start) {
      return {
        x: this.scene.cameras.main.width / 1.5,
        y: this.scene.player.body.bottom + 70
      }
    } else if (last) {
      if (last.getBounds().right + DISTANCE > this.scene.cameras.main.width) {
        return null;
      }

      const up =
        last.y - TOP_INDENT < TOP_INDENT ? false :
        last.y + BOTTOM_INDENT > this.scene.cameras.main.height - BOTTOM_INDENT ? true :
        Boolean(Math.round(Math.random()));

      const min = up ? last.y - MAX_JUMP - MIN_INDENT : last.y + MIN_INDENT;
      const max = up ? last.y - MIN_INDENT : last.y + MIN_INDENT + MAX_JUMP;

      return {
        x: this.scene.cameras.main.width + size / 2,
        y: Phaser.Math.Between(max, min)
      }
    }
    return null;
  }

  public gameOver(): void {
    this.platforms.remove();
    this.scene.platforms.children.iterate((platform: Platform): void => {
      platform.tween.stop();
    });
    this.scene.bg.tween.stop();

  }
}

export default GameActions;