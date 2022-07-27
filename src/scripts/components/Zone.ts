class Zone extends Phaser.GameObjects.Zone {
  constructor(
    scene: Phaser.Scene,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(scene, x, y, width, height);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.build();
  }

  public x: number;
  public y: number;
  private press: boolean;
  private xDown: number;
  private yDown: number;
  private graphics: Phaser.GameObjects.Graphics;
  private pointer: Phaser.Input.Pointer = this.scene.input.activePointer;
  public clickCallback: Function = (): void => {};
  public downCallback: Function = (): void => {};

  public build(): void {
    this.scene.add.existing(this);
    this.setInteractive();
    this.сlick();
    // this.setGraphic();
  }

  private setGraphic(): void {
    this.graphics = this.scene.add.graphics().setDepth(this.y * 5);
    this.graphics.lineStyle(2, 0xFFFF00);
    this.graphics.strokeRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
  }

  private сlick(): void {
    let moveCounter = 0;
    const maxMoveCounter = 3;
  
    this.on('pointerdown', (): void => {
      this.xDown = this.x;
      this.yDown = this.y;
      this.press = true;
    });
    this.on('pointermove', (): void => {
      if (this.press) moveCounter++;
    });
    this.on('pointerout', (): void => {
      if (this.press) {
        moveCounter = 0;
        this.press = false;
      }
    });
    this.on('pointerup', (): void => {
      let x: number;
      let y: number;
  
      if (this.xDown >= this.x) x = this.xDown - this.x;
      else x = this.x - this.xDown;
  
      if (this.yDown >= this.y) y = this.yDown - this.y;
      else y = this.y - this.yDown;
      
      if (this.press && moveCounter < maxMoveCounter && x < 5 && y < 5) {
        this.press = false;
        this.clickCallback();
      } else if (this.press) {
        this.press = false;
      }
      moveCounter = 0;
    });
  }

  protected preUpdate(): void {
    if (this.pointer.isDown || this.scene.input.pointer1.isDown) {
      this.downCallback();
    }
  }

  public destroy(): void {
    this.graphics?.destroy();
    super.destroy();
  }
}

export default Zone;