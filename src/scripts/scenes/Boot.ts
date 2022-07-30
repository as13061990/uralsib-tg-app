import * as Webfont from '../libs/Webfonts.js';
import User from '../data/User';

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
      console.log('build', this.build);
      this.userReady = false;
      this.fontsReady = false;
      this.scene.launch('Menu');
    }
  }

  private async checkUser(): Promise<void> {
    const telegram = window['Telegram']['WebApp'];
    telegram.ready();

    try {      
      User.setID(telegram.initDataUnsafe.user.id);
      User.setName(telegram.initDataUnsafe.user.first_name);
    }
    catch (e) {
      User.setID('1'); // '771545999'
      User.setName('Неизвестный игрок');
    }
    console.clear();
    console.log(User.id);
    console.log(User.name);
    
    this.userReady = true;
  }
}

export default Boot;