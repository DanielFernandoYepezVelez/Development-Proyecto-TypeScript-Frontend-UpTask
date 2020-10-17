import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { IProject } from '../interfaces/project.interface';

/* Model Project(For All Project) */
import { Project } from '../models/project.model';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  public project: Project;
  private url: string = environment.baseUrl;

  get token(): string {
    return `Bearer ${localStorage.getItem('token') || ''}`;
  }

  constructor(private http: HttpClient) { }

  /**
   * Project Create
   */
  public createProject(name: IProject): Observable<object> {
    return this.http.post(`${this.url}/project`, { name }, {
               headers: { Authorization: this.token }});
  }
}