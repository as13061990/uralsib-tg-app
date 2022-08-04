import Game from '../scenes/Game';
import Button from './Button';

class Pause extends Button {
  constructor(scene: Game) {
    super(scene, scene.actions.getRightUAPointX(), 80, 'pause');
    this.setDepth(1);
    this.setOrigin(1, 0.5);
    this.setSimpleClick();
    this.callback = (): void => this.click();
  }
  
  private click(): void {
    this.scene.scene.pause();
    this.scene.scene.launch('Modal');
  }
  
  public getY(): number {
    return this.y;
  }
}

export default Pause;