import { makeAutoObservable } from 'mobx';
import langs from '../data/langs';
import { screen } from '../types/enums';
import User from './User';

class Settings {
  constructor() {
    makeAutoObservable(this);
  }

  public readonly sizes = {
    minWidth: 720,
    maxWidth: 1000,
    minHeight: 1200,
    maxHeight: 1620
  }
  public readonly lang: { [key: string]: string } = langs.ru;
  public screen: screen = screen.RESULT;
  public readonly speed: number = 1350
  public readonly duration: number = 3500;
  public readonly maxScore: number = 1000;

  public setScreen(screen: screen): screen {
    this.screen = screen;
    return this.screen;
  }

  public getSpeed(): number {
    return this.speed + User.score / 2;
  }
}

export default new Settings;