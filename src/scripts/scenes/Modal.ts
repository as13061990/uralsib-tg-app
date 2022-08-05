import Rules from '../components/Rules';
import Game from './Game';

class Modal extends Phaser.Scene {
  constructor() {
    super('Modal');
  }
  
  public create(): void {
    const game = this.game.scene.getScene('Game') as Game

    if (game.gameOver) {
      const camera = this.cameras.main;
      camera.setBackgroundColor('rgba(189, 122, 241, 0.3)');
      const wasted = this.add.sprite(camera.centerX, camera.centerY, 'wasted').setAlpha(0.5);
      this.add.tween({
        targets: wasted,
        duration: 1500,
        alpha: 1,
        onUpdate: (tween: Phaser.Tweens.Tween): void => {
          const alpha = Number((tween.elapsed / (tween.duration / 100) * 0.01).toFixed(2));

          if (alpha > 0.3 && alpha < 0.8) {
            camera.setBackgroundColor('rgba(189, 122, 241, ' + alpha + ')');
          }
        }
      });
    } else {
      new Rules(this);
    }
  }
}

export default Modal;