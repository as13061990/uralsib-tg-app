class Score extends Phaser.GameObjects.Text {
  constructor(scene: Phaser.Scene, x: number, y: number, score: string) {
    super(scene, x, y, score, {
      font: '40px stolzl_medium',
      color: '#FFFFFF'
    });
    this.init();
  }

  private init(): void {
    this.scene.add.existing(this);
    this.setOrigin(0.5, 0.5);
    this.setDepth(4);
    this.scene.add.tween({
      targets: this,
      y: '-=100',
      alpha: 0,
      onComplete: (): void => this.destroy()
    });
  }
}

export default Score;