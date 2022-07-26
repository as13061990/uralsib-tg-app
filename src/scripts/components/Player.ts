import Game from '../scenes/Game';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, 150, scene.cameras.main.centerY, 'player');
    this.init();
  }

  private init(): void {
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setBounce(0.2);
    this.setGravityY(800);
    this.setDepth(3);
    this.body.setSize(80);
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);
    
    // описать нажатия и движение
    this.anims.play('run', true);
  }
}

export default Player;