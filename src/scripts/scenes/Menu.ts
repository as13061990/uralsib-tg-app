import MenuActions from '../actions/MenuActions';
import Settings from '../data/Settings';
import Start from '../screens/Start';
import Result from '../screens/Result';
import { screen } from '../types/enums';

class Menu extends Phaser.Scene {
  constructor() {
    super('Menu');
  }
  
  public actions: MenuActions = new MenuActions(this);
  public screen: Iscreen;

  public preload(): void {
    this.actions.loadAssets();
  }

  public create(): void {
    const bg = this.add.sprite(0, this.cameras.main.height, 'gradient').setOrigin(0, 1);
    bg.setDisplaySize(this.cameras.main.width, bg.height);

    if (Settings.screen === screen.START) {
      this.screen = new Start(this);
    } else if (Settings.screen === screen.RESULT) {
      this.screen = new Result(this);
    }
  }
}

export default Menu;