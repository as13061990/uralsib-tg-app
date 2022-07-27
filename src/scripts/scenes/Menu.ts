import MenuActions from '../actions/MenuActions';
import Settings from '../data/Settings';
import Start from '../screens/Start';
import Result from '../screens/Result';
import { screen } from '../types/enums';

class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }
  
  public actions: MenuActions;
  public screen: Iscreen;

  public init(): void {
    this.actions = new MenuActions(this);
  }

  public preload(): void {
    this.actions.loadAssets();
  }

  public create(): void {
    this.add.sprite(this.cameras.main.centerX, this.cameras.main.height, 'gradient').setOrigin(0.5, 1);

    if (Settings.screen === screen.START) {
      this.screen = new Start(this);
    } else if (Settings.screen === screen.RESULT) {
      this.screen = new Result(this);
    }
  }
}

export default Menu;