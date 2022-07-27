import Menu from '../scenes/Menu';
import { screen } from '../types/enums';

class Result implements Iscreen {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  private scene: Menu;
  public readonly type: screen = screen.RESULT;

  private init(): void {
    const main = this.scene.cameras.main;

  }

  public hide(): void {}
  public show(): void {}
}

export default Result;