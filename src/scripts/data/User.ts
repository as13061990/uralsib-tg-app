import { makeAutoObservable } from 'mobx';

class User {
  constructor() {
    makeAutoObservable(this);
  }

  public rules: boolean = false;

  public markRules(): boolean {
    this.rules = true;
    return this.rules;
  }
}

export default new User;