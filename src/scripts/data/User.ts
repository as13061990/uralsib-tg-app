import { makeAutoObservable } from 'mobx';
import Settings from './Settings';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  public id: string = null;
  public name: string = null;
  public rules: boolean = false;
  public score: number = 0;
  public record: number = 0;
  public maxScore: number = 1000;
  public username: string = null;

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

  public setID(id: string): string {
    this.id = id;
    return this.id;
  }

  public setName(name: string): string {
    this.name = name;
    return this.name;
  }

  public setUsername(username: string): string {
    this.username = username;
    return this.username;
  }

  public setRecord(record: number): number {
    this.record = record;
    return this.record;
  }

  public setRules(rules: boolean): boolean {
    this.rules = rules;
    return this.rules;
  }
}

export default new User;