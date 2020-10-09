import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

/* Interfaces */
import { ILogin } from '../interfaces/login.interface';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';

/* Variables Google */
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private auth2: any;
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) { }

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
   * Logout De Google - Delete Token LocalStorage
   */
  public logout(): void {
    this.auth2 = gapi.auth2.getAuthInstance();

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
      });
    });
  }
}