import User from '../data/User';
import Game from '../scenes/Game';
import Menu from '../scenes/Menu';
import Button from './Button';
import Zone from './Zone';
import Settings from '../data/Settings';

const WIDTH = 650; // ширина прямоугольника
const HEIGHT = 900; // высота прямоугольника

class Rules {
  constructor(scene: Phaser.Scene, start: boolean = false) {
    this.scene = scene;
    this.start = start;
    this.init();
  }

  private scene: Phaser.Scene;
  private zone: Zone;
  private rectangle: Phaser.GameObjects.Graphics;
  private closeBtn: Button;
  private start: boolean;
  private startGame: boolean = false;
  private texts: Phaser.GameObjects.Text[];
  private icons: Phaser.GameObjects.Sprite[];

  private init(): void {
    this.texts = [];
    this.icons = [];
    this.show();
    this.setMark();
    this.createClickZone();
    this.createRectangle();
    this.createСloseBtn();
    this.createTexts();
  }

  private show(): void {
    if (this.scene.scene.isActive('Menu')) {
      const Menu = this.scene.game.scene.getScene('Menu') as Menu;
      Menu.screen.hide();
    }
    
    if (this.scene.scene.isActive('Game')) {
      const Game = this.scene.game.scene.getScene('Game') as Game;
      Game.scene.pause();
    }
  }

  private setMark(): void {
    if (User.rules === false) {
      this.startGame = true;
      User.markRules();
    }
  }

  private createClickZone(): void {
    const camera = this.scene.cameras.main;
    this.zone = new Zone(this.scene, camera.centerX, camera.centerY, camera.width, camera.height);
    this.zone.setDepth(4);
  }

  private createRectangle(): void {
    const camera = this.scene.cameras.main;
    this.rectangle = this.scene.add.graphics({
      x: camera.centerX - WIDTH / 2,
      y: camera.centerY - HEIGHT / 2
    });
    this.rectangle.fillStyle(0xFFFFFF, 1);
    this.rectangle.fillRoundedRect(0, 0, WIDTH, HEIGHT, 8);
  }

  private createСloseBtn(): void {
    const x = this.rectangle.x + WIDTH - 60;
    const y = this.rectangle.y + 60;
    
    this.closeBtn = new Button(this.scene, x, y, 'close');
    this.closeBtn.callback = (): void => this.close();
    this.closeBtn.setDepth(5);
  }

  private createTexts(): void {
    const y = this.closeBtn.y + 30;

    const rules = this.scene.add.text(this.scene.cameras.main.centerX, y, Settings.lang.rules.toUpperCase(), {
      font: 'bold 40px stolzl_light',
      color: '#000000'
    }).setOrigin(0.5, 0);

    const descr1 = this.scene.add.text(90, rules.getBounds().bottom + 50, Settings.lang.rulesDescr1, {
      font: '30px stolzl_light',
      color: '#000000'
    });

    const fifty = this.scene.add.text(descr1.getBounds().left, descr1.getBounds().bottom + 60, '50 ' + Settings.lang.score3 + ':', {
      font: '30px stolzl_medium',
      color: '#000000'
    }).setOrigin(0, 0.5);
    
    const twenty = this.scene.add.text(descr1.getBounds().left, fifty.getBounds().bottom + 50, '20 ' + Settings.lang.score3 + ':', {
      font: '30px stolzl_medium',
      color: '#000000'
    }).setOrigin(0, 0.5);

    const descr2 = this.scene.add.text(descr1.getBounds().left, twenty.getBounds().bottom + 40, Settings.lang.rulesDescr2, {
      font: '30px stolzl_light',
      color: '#000000'
    });
    
    const goodluck = this.scene.add.text(descr1.getBounds().left, descr2.getBounds().bottom + 40, Settings.lang.goodluckShort, {
      font: '30px stolzl_light',
      color: '#000000'
    });

    this.texts.push(rules);
    this.texts.push(descr1);
    this.texts.push(fifty);
    this.texts.push(twenty);
    this.texts.push(descr2);
    this.texts.push(goodluck);
    this.createBlueIcons(fifty.y);
    this.createRedIcons(twenty.y);
  }

  private createBlueIcons(y: number): void {
    const position = 255;

    for (let i = 1; i <= 4; i++) {
      const x = position + i * 50;
      const icon = this.scene.add.sprite(x, y, 'blue-' + i).setScale(0.65);
      this.icons.push(icon);
    }
  }

  private createRedIcons(y: number): void {
    const position = 255;

    for (let i = 1; i <= 5; i++) {
      const x = position + i * 50;
      const icon = this.scene.add.sprite(x, y, 'red-' + i).setScale(0.65);
      this.icons.push(icon);
    }
  }

  private destroy(): void {
    this.zone.destroy();
    this.rectangle.destroy();
    this.closeBtn.destroy();
    this.texts.map(text => {
      text.destroy();
    });
    this.icons.map(icon => {
      icon.destroy();
    });
  }

  private close(): void {
    this.destroy();

    if (this.startGame && this.start) {
      this.scene.scene.start('Game');
      return;
    }
    
    if (this.scene.scene.isActive('Menu')) {
      const Menu = this.scene.game.scene.getScene('Menu') as Menu;
      Menu.screen.show();
      return;
    }

    if (this.scene.scene.isActive('Game')) {
      const Game = this.scene.game.scene.getScene('Game') as Game;
      Game.scene.resume();
      return;
    }
  }
}

export default Rules;