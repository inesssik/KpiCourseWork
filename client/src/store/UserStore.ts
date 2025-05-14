import { makeObservable, observable, action, computed } from 'mobx';

export interface IUser {
  id?: number;
  name?: string;
  email?: string;
}

export default class UserStore {
  @observable private _isAuth: boolean = false;
  @observable private _user: IUser | {} = {};

  constructor() {
    makeObservable(this);
  }

  @action public setIsAuth(value: boolean) {
    this._isAuth = value;
  }

  @action public setUser(user: IUser | {}) {
    this._user = user;
  }

  @computed public get isAuth(): boolean {
    return this._isAuth;
  }

  @computed public get user(): IUser | {} {
    return this._user;
  }
}
