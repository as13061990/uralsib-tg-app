import Game from '../scenes/Game';

const HEIGHT = 1700;
const WIDTH = 8854;
const SPEED = 60000;

class Background extends Phaser.GameObjects.TileSprite {
  constructor(scene: Game) {
    super(scene, 0, scene.cameras.main.centerY, WIDTH, HEIGHT, 'bg');
    this.init();
  }

  public tween: Phaser.Tweens.Tween;
  
  private init(): void {
    this.scene.add.existing(this);
    this.setOrigin(0, 0.5);
    this.setDepth(-2);

    const co = this.scene.cameras.main.height / this.height;
    this.setScale(co, co);

    this.tween = this.scene.tweens.add({
      targets: this,
      tilePositionX: { from: 0, to: this.width },
      duration: SPEED,
      repeat: -1
    });
  }
}

export default Background;