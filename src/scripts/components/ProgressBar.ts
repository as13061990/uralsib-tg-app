import Settings from '../data/Settings';
import User from '../data/User';
import Game from '../scenes/Game';

class ProgressBar {
  constructor(scene: Game) {
    this.scene = scene;
    this.init();
  }

  private scene: Game;
  private bg: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private pointer: Phaser.GameObjects.Sprite;
  private tile: Phaser.GameObjects.TileSprite;
  private tween: Phaser.Tweens.Tween;

  private init(): void {
    this.bg = this.scene.add.sprite(this.scene.actions.getLeftUAPointX(), this.scene.pause.getY(), 'progress-bg').setOrigin(0, 0.5);
    const width = this.scene.cameras.main.width - this.bg.x - this.scene.actions.getUASpace();
    
    this.bg.setDisplaySize(width, this.bg.height);
    const bounds = this.bg.getBounds();
    
    const scoreX = bounds.right + ((this.scene.pause.getBounds().left - bounds.right) / 2);
    this.text = this.scene.add.text(scoreX, this.bg.y, '0', {
      font: '34px stolzl_medium',
      color: '#7545C9',
    }).setOrigin(0.5, 0.5);

    this.tile = this.scene.add.tileSprite(this.bg.x, this.bg.y, 0, this.bg.height, 'progress').setOrigin(0, 0.5);
    const mask = this.bg.createBitmapMask();
    this.tile.setMask(mask);

    this.pointer = this.scene.add.sprite(this.bg.x, this.bg.y, 'point');

    this.update();
  }

  private getPoint(): number {
    const point = this.bg.displayWidth / Settings.maxScore;
    return this.bg.x + point * User.score;
  }
  
  public update(): void {
    this.text.setText(String(User.score));
    const point = this.getPoint();
    
    this.tween?.remove();
    this.tween = this.scene.add.tween({
      targets: this.pointer,
      x: point,
      duration: 300
    });
    this.tile.setDisplaySize(point - this.tile.x, this.bg.height);
  }

  public getY(): number {
    return this.bg.y;
  }
}

export default ProgressBar;