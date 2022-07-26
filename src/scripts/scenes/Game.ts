const player = require('../../assets/images/player.png');

class Game extends Phaser.Scene {
  constructor() {
    super('Game');
  }

  private player: Phaser.Physics.Arcade.Sprite;

  public preload(): void {
    this.load.spritesheet('player', player, { frameWidth: 150, frameHeight: 199 });
  }

  public create(): void {
    this.anims.create({
      key: 'run',
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1
    });
    
    this.player = this.physics.add.sprite(this.cameras.main.centerX, this.cameras.main.centerY, 'player').setCollideWorldBounds(true);
  }

  public update(): void {
    this.player.anims.play('run', true);
  }
}

export default Game;