import Rules from '../components/Rules';

class Modal extends Phaser.Scene {
  constructor() {
    super('Modal');
  }
  
  public create(): void {
    new Rules(this);
  }
}

export default Modal;