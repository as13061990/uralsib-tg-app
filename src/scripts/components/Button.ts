class Button extends Phaser.GameObjects.Sprite {
  constructor(scene: Phaser.Scene, x: number, y: number, texture: string) {
    super(scene, x, y, texture);
    this.scene = scene;
    this.x = x;
    this.y = y;
    this.init();
  }

  public x: number;
  public y: number;
  private press: boolean;
  public callback: Function = (): void => {};

  private init(): void {
    this.scene.add.existing(this);
    this.pressButton();
  }

  private pressButton(): void {
    this.setInteractive();
    this.on('pointerdown', (): void => {
      this.press = true;
      let counter = 0;
      let filter = 0xFFFFFF;

      const interval = this.scene.time.addEvent({ delay: 5, callback: (): void => {
        filter -= 0x111111;
        this.setTint(filter);
        this.y = Math.round(this.y + 1);
        counter++;
  
        if (counter >= 3) {
          interval.remove(false);
        }
      }, callbackScope: this, loop: true });
    });
  
    this.on('pointerout', (): void => {
      if (this.press) {
        this.press = false;
        let counter = 0;
        let filter = 0xCCCCCC;

        const interval = this.scene.time.addEvent({ delay: 10, callback: (): void => {
          filter += 0x111111;
          this.setTint(filter);
          this.y = Math.round(this.y - 1);
          counter++;
  
          if (counter >= 3) {
            interval.remove(false);
          }
        }, callbackScope: this, loop: true });
      }
    });
  
    this.on('pointerup', (): void => {
      if (this.press) {
        this.press = false;
        let counter = 0;
        let filter = 0xCCCCCC;
        const interval = this.scene.time.addEvent({ delay: 10, callback: (): void => {
          filter += 0x111111;
          this.setTint(filter);
          this.y = Math.round(this.y - 1);
          counter++;
  
          if (counter >= 3) {
            interval.remove(false);
          }
        }, callbackScope: this, loop: true });

        this.callback();
      }
    });
  }
}

export default Button;