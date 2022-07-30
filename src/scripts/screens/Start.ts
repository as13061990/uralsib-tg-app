import Menu from '../scenes/Menu';
import Settings from '../data/Settings';
import Button from '../components/Button';
import { screen } from '../types/enums';

class Start implements Iscreen {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  public readonly type: screen = screen.START;
  private scene: Menu;
  private logo: Phaser.GameObjects.Sprite;
  private text: Phaser.GameObjects.Text;
  private runFinsih: Phaser.GameObjects.Text;
  private thousand: Phaser.GameObjects.Text;
  private bonusRuble: Phaser.GameObjects.Text;
  private fromUralsib: Phaser.GameObjects.Text;
  private goodluck: Phaser.GameObjects.Text;
  private rules: Button;
  private start: Button;

  private init(): void {
    const main = this.scene.cameras.main;

    this.logo = this.scene.add.sprite(main.centerX, main.centerY + 100, 'menu-logo');
    this.text = this.scene.add.text(main.centerX, 100, Settings.lang.welcome.toUpperCase(), {
      font: '40px stolzl_medium',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0.5).setLineSpacing(5);

    this.runFinsih = this.scene.add.text(80, this.text.getBounds().bottom + 40, Settings.lang.runFinsih, {
      font: '28px stolzl_light',
      color: '#FFFFFF'
    });

    this.thousand = this.scene.add.text(this.runFinsih.getBounds().right + 10, this.runFinsih.y, '1000', {
      font: '28px stolzl_medium',
      color: '#FFFFFF'
    });

    this.bonusRuble = this.scene.add.text(90, this.thousand.getBounds().bottom + 5, Settings.lang.bonusRuble, {
      font: '28px stolzl_medium',
      color: '#FFFFFF'
    });
    
    this.fromUralsib = this.scene.add.text(this.bonusRuble.getBounds().right + 10, this.bonusRuble.y, Settings.lang.fromUralsib, {
      font: '28px stolzl_light',
      color: '#FFFFFF'
    });

    this.goodluck = this.scene.add.text(main.centerX, this.fromUralsib.getBounds().bottom + 40, Settings.lang.goodluck, {
      font: '28px stolzl_light',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0);

    this.rules = new Button(this.scene, 200, this.scene.cameras.main.height - 140, 'rules-btn');
    this.start = new Button(this.scene, 520, this.scene.cameras.main.height - 140, 'start-btn');
    this.rules.callback = (): void => this.scene.actions.clickRulesBtn();
    this.start.callback = (): void => this.scene.actions.clickStartBtn();
  }

  public show(): void {
    this.logo.setVisible(true);
    this.text.setVisible(true);
    this.runFinsih.setVisible(true);
    this.thousand.setVisible(true);
    this.bonusRuble.setVisible(true);
    this.fromUralsib.setVisible(true);
    this.goodluck.setVisible(true);
    this.rules.setVisible(true);
    this.start.setVisible(true);
  }

  public hide(): void {
    this.logo.setVisible(false);
    this.text.setVisible(false);
    this.runFinsih.setVisible(false);
    this.thousand.setVisible(false);
    this.bonusRuble.setVisible(false);
    this.fromUralsib.setVisible(false);
    this.goodluck.setVisible(false);
    this.rules.setVisible(false);
    this.start.setVisible(false);
  }
}

export default Start;