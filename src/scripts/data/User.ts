import { makeAutoObservable } from 'mobx';

const MAX_SCORE = 1000;

class User {
  constructor() {
    makeAutoObservable(this);
  }

  public rules: boolean = false;
  public score: number = 0;
  public record: number = 0;

  public resetScore(): number {
    this.score = 0;
    return this.score;
  }
  
  public scoreIncrement(score: number): boolean {
    this.score = this.score + score > MAX_SCORE ? MAX_SCORE : this.score + score;
    this.record = this.score > this.record ? this.score : this.record;
    console.log('score', this.score);
    return this.score === MAX_SCORE;
  }

  public markRules(): boolean {
    this.rules = true;
    return this.rules;
  }
}

export default new User;