import Game from '../scenes/Game';

const HEIGHT = 1700;
const WIDTH = 3926;
const SPEED = 60000;

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Game) {
    super(scene, 0, scene.cameras.main.centerY, WIDTH, HEIGHT, 'bg');
    this.init();
  }

  public scene: Game;
  public tween: Phaser.Tweens.Tween;
  private indent: number;
  private indentPercent: number;
  private half: number;
  private halfPercent: number;
  
  private init(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 0.5);
    this.setDepth(-2);

    // const co = this.scene.cameras.main.height / this.height;
    // this.setScale(co, co);

    this.tween = this.scene.tweens.add({
      targets: this,
      tilePositionX: { from: 0, to: this.width },
      duration: SPEED,
      repeat: -1
    });
    this.indent = (HEIGHT - this.scene.cameras.main.height) / 2;
    this.indentPercent = this.indent / 100;
    this.half = this.scene.cameras.main.height / 2;
    this.halfPercent = this.half / 100;
  }

  protected preUpdate(): void {
    let y = this.y;
    const up = this.scene.cameras.main.centerY > this.scene.player.y;

    if (up) {
      if (this.scene.player.y > 0 && this.scene.player.y < this.scene.cameras.main.centerY) {
        const position = this.scene.player.y;
        const percent = 100 - position / this.halfPercent;
        y = this.scene.cameras.main.centerY + percent * this.indentPercent;
      }
    } else {
      if (this.half > this.scene.player.y - this.half) {
        const position = this.scene.player.y - this.half;
        const percent = position / this.halfPercent;
        y = this.scene.cameras.main.centerY - percent * this.indentPercent;
      }
    }
    
    if (this.scene.player.y < this.scene.cameras.main.height &&
      this.scene.player.y > 0 &&
      this.y !== y) {
      this.setY(y);
    }
  }
}

export default Background;