import User from '../data/User';
import Game from '../scenes/Game';
import Menu from '../scenes/Menu';
import Button from './Button';
import Zone from './Zone';

const WIDTH = 650; // ширина прямоугольника
const HEIGHT = 800; // высота прямоугольника

class Rules {
  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.init();
  }

  private scene: Phaser.Scene;
  private zone: Zone;
  private rectangle: Phaser.GameObjects.Graphics;
  private closeBtn: Button;

  private init(): void {
    this.show();
    this.setMark();
    this.createClickZone();
    this.createRectangle();
    this.createСloseBtn();
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

  private destroy(): void {
    this.zone.destroy();
    this.rectangle.destroy();
    this.closeBtn.destroy();
  }

  private close(): void {
    this.destroy();
    
    if (this.scene.scene.isActive('Menu')) {
      const Menu = this.scene.game.scene.getScene('Menu') as Menu;
      Menu.screen.show();
    }

    if (this.scene.scene.isActive('Game')) {
      const Game = this.scene.game.scene.getScene('Game') as Game;
      Game.scene.resume();
    }
  }
}

export default Rules;