import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { ILogin } from '../interfaces/login.interface';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * User Login Normal
   */
  public login(formData: ILogin) {
    const { email, password } = formData;
    const loginForm = { email, password };

    return this.http.post(`${this.url}/login`, loginForm)
               .pipe(
                 tap((resp: any) => localStorage.setItem('token', resp.token))
               );
  }

  /**
   * User Login Google
   */
  public loginGoogle(token: string) {
    return this.http.post(`${this.url}/login/google`, { token })
               .pipe(
                 tap((resp: any) => localStorage.setItem('token', resp.tokenPropio))
               );
  }
}
