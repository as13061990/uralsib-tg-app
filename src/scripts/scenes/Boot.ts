import * as Webfont from '../libs/Webfonts.js';

class Boot extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  public build: string;
  private fontsReady: boolean;
  private userReady: boolean;

  public init(): void {    
    this.fontsReady = false;
    this.userReady = false;
    this.build = '1.0.0';
    const scene = this;
    Webfont.load({
      custom: {
        families: ['Triomphe']
      },
      active(): void {
        scene.fontsReady = true;
      }
    });
    this.checkUser();
  }

  public preload(): void {
    // this.load.image('test', '../../test.png');
  }

  public update(): void {
    if (this.userReady && this.fontsReady) {
      console.log('build', this.build);
      this.userReady = false;
      this.fontsReady = false;
      this.scene.launch('Game');
    }
  }

  private async checkUser(): Promise<void> {
    this.userReady = true;
  }
}

export default Boot;