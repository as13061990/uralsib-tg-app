import Game from '../scenes/Game';

const MAX_JUMP = 500; // максимальный счетчик нажатия прыжка

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.centerX - 210, scene.cameras.main.centerY, 'player');
    this.init();
  }

  public scene: Game;
  private cursors: Phaser.Types.Input.Keyboard.CursorKeys;
  private jumpCounter: number;

  private init(): void {
    this.jumpCounter = 0;
    this.cursors = this.scene.input.keyboard.createCursorKeys();
    this.scene.anims.create({
      key: 'run',
      frames: this.scene.anims.generateFrameNumbers('player', { start: 2, end: 9 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.anims.create({
      key: 'crash',
      frames: [ { key: 'player', frame: 0 } ]
    });
    this.scene.anims.create({
      key: 'jump',
      frames: [ { key: 'player', frame: 1 } ]
    });
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.setGravityY(800);
    this.setDepth(3);
    this.body.setSize(80);
  }

  public jump(): void {
    if (this.scene.pause.press) return;
    
    if (this.body.touching.down && this.jumpCounter === 0) {
      this.jumpCounter = 1;
    }

    if (this.body.touching.down || (this.jumpCounter > 0 && this.jumpCounter < MAX_JUMP)) {
      this.setVelocityY(-300);
    }
  }

  protected preUpdate(time: number, delta: number): void {
    super.preUpdate(time, delta);

    if (this.jumpCounter > 0) {
      this.jumpCounter = this.jumpCounter > MAX_JUMP ? 0 : this.jumpCounter += delta;
      this.jumpCounter = this.jumpCounter > 0 && this.body.touching.down ? 0 : this.jumpCounter;
    }

    if (this.cursors.space.isDown) {
      this.jump();
    }
    
    if (this.scene.gameOver) {
      // this.anims.play('crash', true);
      this.anims.play('jump', true);
    } else if (!this.body.touching.down) {
      this.anims.play('jump', true);
    } else {
      this.anims.play('run', true);
    }

    if (this.y > this.scene.cameras.main.height + this.height / 2) {
      this.scene.actions.gameOver();
    }
  }
}

export default Player;