import Game from '../scenes/Game';
import Player from './Player';

const SPEED = 3000; // скорость движения платформы
const SIDE = 38; // ширина края платформа
const HEIGHT = 78; // высота спрайта платформы
const MAX_JUMP = 150; // абстрактное число максимального прыжка
const INDENT = 300; // границы отступа для платформ снизу и сверху

class Platform extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game, size: number, start: boolean = false) {
    const x = start ? scene.cameras.main.width / 1.5 : scene.cameras.main.width + size / 2;
    const last: Platform = scene.platforms.getChildren()[scene.platforms.getLength() - 1] as Platform;
    let y = scene.player.body.bottom + 70;
    
    if (!start) {
      const max = last.y - MAX_JUMP < INDENT ? last.y - MAX_JUMP : INDENT;
      const min = last.y + MAX_JUMP > scene.cameras.main.height - INDENT ? last.y + MAX_JUMP : scene.cameras.main.height - INDENT;
      y = Phaser.Math.Between(max, min);
    }
    super(scene, x, y, 'pixel');
    this.size = size;
    this.init();
  }

  public tween: Phaser.Tweens.Tween;
  private size: number;
  private left: Phaser.GameObjects.Sprite;
  private center: Phaser.GameObjects.TileSprite;
  private right: Phaser.GameObjects.Sprite;
  
  private init(): void {
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.body.setSize(this.size, 50);
    this.setPushable(false);
    this.build();
    this.move();
  }

  private build(): void {
    this.left = this.scene.add.sprite(this.leftX(), this.y, 'platform')
      .setOrigin(0, 0.5);
    this.right = this.scene.add.sprite(this.rightX(), this.y, 'platform')
      .setOrigin(1, 0.5)
      .setFlipX(true);
    const width = this.size - SIDE * 2;
    this.center = this.scene.add.tileSprite(this.x, this.y, width, HEIGHT, 'platform-tile');
  }

  private leftX(): number {
    return this.x - this.size / 2;
  }

  private rightX(): number {
    return this.x + this.size / 2;
  }

  private move(): void {
    this.tween = this.scene.add.tween({
      targets: this,
      x: '-=1200',
      duration: SPEED,
      onComplete: (): void => this.destroy()
    });
  }

  public destroy(): void {
    this.left?.destroy();
    this.center?.destroy();
    this.right?.destroy();
    super.destroy();
  }

  protected preUpdate(): void {
    this.left.setX(this.leftX());
    this.right.setX(this.rightX());
    this.center.setX(this.x);
  }

  private static getIndent(player: Player): number {
    return -100;
  }
}

export default Platform;