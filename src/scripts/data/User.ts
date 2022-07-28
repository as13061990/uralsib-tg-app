import { makeAutoObservable } from 'mobx';
import Settings from './Settings';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  public rules: boolean = false;
  public score: number = 0;
  public record: number = 0;
  public maxScore: number = 1000;

  public resetScore(): number {
    this.score = 0;
    return this.score;
  }
  
  public scoreIncrement(score: number): boolean {
    this.score = this.score + score > Settings.maxScore ? Settings.maxScore : this.score + score;
    this.record = this.score > this.record ? this.score : this.record;
    return this.score === Settings.maxScore;
  }

  public markRules(): boolean {
    this.rules = true;
    return this.rules;
  }
}

export default new User;