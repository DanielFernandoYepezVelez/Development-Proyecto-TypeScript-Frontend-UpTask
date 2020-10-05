import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { IRegister } from '../interfaces/register.interface';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  public createUser(formRegister: IRegister) {
    return this.http.post(`${this.url}/register`, formRegister);
  }
}
