import Menu from '../scenes/Menu';

class Loading {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  private scene: Menu;

  private init(): void {
    const camera = this.scene.cameras.main;
    const loading = this.scene.add.sprite(camera.centerX, camera.centerY - 100, 'loading');
    const text = this.scene.add.text(camera.centerX, camera.centerY + 50, '0%', {
      font: '30px stolzl_medium',
      color: '#6850B9'
    }).setOrigin(0.5, 0.5);

    this.scene.load.on('progress', (value: number): void => {
      const percent = Math.round(value * 100);
      text.setText(percent + '%');
    }, this);
    this.scene.load.on('complete', (): void => {
      this.scene.load.removeAllListeners();
      loading.destroy();
      text.destroy();
    }, this);
  }
}

export default Loading;