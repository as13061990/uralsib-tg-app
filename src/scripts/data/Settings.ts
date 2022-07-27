import { makeAutoObservable } from 'mobx';
import langs from '../data/langs';
import { screen } from '../types/enums';

class Settings {
  constructor() {
    makeAutoObservable(this);
  }

  public readonly sizes = {
    width: 720,
    minHeight: 1100,
    maxHeight: 1620
  }
  public readonly lang: { [key: string]: string } = langs.ru;
  public screen: screen = screen.START;
  public readonly speed: number = 1200;
  public readonly duration: number = 3000;

  public setScreen(screen: screen): screen {
    this.screen = screen;
    return this.screen;
  }
}

export default new Settings;