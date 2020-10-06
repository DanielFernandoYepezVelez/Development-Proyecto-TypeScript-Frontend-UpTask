import { catchError, map, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { ILogin } from '../interfaces/login.interface';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  /**
   * User Login Normal
   */
  public login(formData: ILogin): Observable<any> {
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
  public loginGoogle(token: string): Observable<any> {
    return this.http.post(`${this.url}/login/google`, { token })
               .pipe(
                 tap((resp: any) => localStorage.setItem('token', resp.tokenPropio))
               );
  }

  /**
   * Validate Token LocalStorage And Renew
   */
  public loginRenew(): Observable<boolean> {
    const token: string = localStorage.getItem('token') || '';

    return this.http.get(`${this.url}/login/renew`, {
      headers: { Authorization: `Bearer ${token}`}})
              .pipe(
                tap((resp: any) => localStorage.setItem('token', resp.tokenValidado)),
                map(() => true),
                catchError(() => of(false))
              );
  }

  /**
   * Delete Token LocalStorage, Then Logout
   */
  public logout(): void {
    localStorage.removeItem('token');
  }
}
