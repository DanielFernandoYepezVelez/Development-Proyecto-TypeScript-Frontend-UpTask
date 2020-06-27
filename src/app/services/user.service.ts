import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { IUserSignUp, IUserSignIn } from '../models/IUser';

@Injectable()
export class UserService {
  constructor(private http: HttpClient) {}

  private setUrl(query: string) {
    const url = `http://localhost:3001/api/${query}`;
    return url;
  }

  signUp(user: IUserSignUp) {
    return this.http.post(this.setUrl('signup'), user);
  }

  signIn(user: IUserSignIn) {
    return this.http.post(this.setUrl('signin'), user);
  }
}
