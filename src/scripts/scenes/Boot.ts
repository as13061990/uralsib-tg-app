import * as Webfont from '../libs/Webfonts.js';

const loading = require('../../assets/images/loading.png');

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
        families: ['stolzl_medium', 'stolzl_light']
      },
      active(): void {
        scene.fontsReady = true;
      }
    });
    this.checkUser();
  }

  public preload(): void {
    this.load.image('loading', loading);
  }

  public update(): void {
    if (this.userReady && this.fontsReady) {
      console.clear();
      console.log('build', this.build);
      this.userReady = false;
      this.fontsReady = false;
      this.scene.launch('Menu');
    }
  }

  private async checkUser(): Promise<void> {
    this.userReady = true;
  }
}

export default Boot;