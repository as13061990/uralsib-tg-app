import Settings from '../data/Settings';
import User from '../data/User';

class ProgressBar {
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.init();
  }

  private scene: Phaser.Scene;
  private bg: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private pointer: Phaser.GameObjects.Sprite;
  private tile: Phaser.GameObjects.TileSprite;
  private tween: Phaser.Tweens.Tween;

  private init(): void {
    const camera = this.scene.cameras.main;
    this.bg = this.scene.add.sprite(camera.centerX - 330, 80, 'progress-bg').setOrigin(0, 0.5);
    const bounds = this.bg.getBounds();

    this.text = this.scene.add.text(bounds.right + 57, this.bg.y, '0', {
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
    const point = this.bg.width / Settings.maxScore;
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