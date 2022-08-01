import Button from '../components/Button';
import Menu from '../scenes/Menu';
import Settings from '../data/Settings';
import { screen } from '../types/enums';
import User from '../data/User';
import axios from 'axios';

class Result implements Iscreen {
  constructor(scene: Menu) {
    this.scene = scene;
    this.init();
  }

  private scene: Menu;
  public readonly type: screen = screen.RESULT;

  private init(): void {
    const camera = this.scene.cameras.main;
    
    const logo = this.scene.add.sprite(camera.centerX + 20, 230, 'result');

    const score = User.score + ' ' + this.scores(User.score);
    this.scene.add.text(logo.x + 132, logo.y - 45, score, {
      font: '42px stolzl_medium',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0);

    const record = Settings.lang.yourRecord + User.record + ' ' + this.scores(User.record);
    this.scene.add.text(logo.x + 132, logo.y + 20, record, {
      font: '19px stolzl_medium',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0);

    this.scene.add.text(camera.centerX, camera.centerY - 185, Settings.lang.resultDescr, {
      font: '28px stolzl_light',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0);
    
    const ad = this.scene.add.text(camera.centerX + 20, camera.centerY + 60, Settings.lang.ad, {
      font: '28px stolzl_medium',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0.5).setLineSpacing(15);

    this.scene.add.sprite(ad.getBounds().left - 30, ad.y - 50, 'dot');
    this.scene.add.sprite(ad.getBounds().left - 8, ad.y, 'dot');
    this.scene.add.sprite(ad.getBounds().left + 90, ad.y + 50, 'dot');
    
    const attention1 = this.scene.add.text(67, camera.centerY + 190, Settings.lang.attention1, {
      font: '28px stolzl_light',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5);

    this.scene.add.text(attention1.getBounds().right + 12, attention1.y, Settings.lang.only, {
      font: '28px stolzl_medium',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5);

    const oneApplication = this.scene.add.text(72, attention1.y + 35, Settings.lang.oneApplication, {
      font: '28px stolzl_medium',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5);

    this.scene.add.text(oneApplication.getBounds().right + 12, oneApplication.y, Settings.lang.attention2, {
      font: '28px stolzl_light',
      color: '#FFFFFF'
    }).setOrigin(0, 0.5);

    this.scene.add.text(camera.centerX, oneApplication.y + 20, Settings.lang.attention3, {
      font: '28px stolzl_light',
      color: '#FFFFFF',
      align: 'center'
    }).setOrigin(0.5, 0);

    const again = new Button(this.scene, camera.centerX, camera.height - 100, 'again-btn');
    const prize = new Button(this.scene, camera.centerX, again.getBounds().top - 70, 'prize-btn');
    again.callback = (): void => {
      this.scene.scene.start('Game');
    }
    prize.callback = (): void => {
      const a = document.createElement('a');
      a.setAttribute('target', '_blank');
      document.body.appendChild(a);
      a.href = process.env.LINK;
      a.click();
      document.body.removeChild(a);
      this.sendPrize();
    }
    this.sendData();
  }

  private scores(score: number): string {
    const lastDigit = score % 10;
    let word: string;

    if (lastDigit === 1) word = Settings.lang.score1;
    else if (lastDigit === 2 || lastDigit === 3 || lastDigit === 4) word = Settings.lang.score2;
    else word = Settings.lang.score3;

    if (score > 10) {
      const lastDigits = score % 100;
      
      if (lastDigits === 11 || lastDigits === 12 || lastDigits === 13 || lastDigits === 14) word = Settings.lang.score3;
    }
    return word;
  }

  private sendData(): void {
    axios.post(process.env.API + '/sendData', {
      id: User.id,
      record: User.record
    });
  }

  private sendPrize(): void {
    axios.post(process.env.API + '/prize', {});
  }

  public hide(): void {}
  public show(): void {}
}

export default Result;