import Game from '../scenes/Game';
import Button from './Button';

class Pause extends Button {
  constructor(scene: Game) {
    super(scene, scene.cameras.main.width - 50, scene.progress.getY(), 'pause');
    this.setDepth(10);
    this.callback = (): void => this.click();
  }
  
  private click(): void {
    this.scene.scene.pause();
    this.scene.scene.launch('Modal');
  }
}

export default Pause;