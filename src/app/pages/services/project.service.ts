import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { IProject } from '../interfaces/project.interface';

/* Services */
import { LoginService } from '../../auth/services/login.service';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private url: string = environment.baseUrl;

  get token(): string {
    return `Bearer ${localStorage.getItem('token') || ''}`;
  }

  constructor(private http: HttpClient, private loginService: LoginService) { }

  /**
   * Project Create
   */
  public createProject(name: IProject): Observable<object> {
    return this.http.post(`${this.url}/project`, { name }, {
               headers: { Authorization: this.token }})
                .pipe(
                  tap((resp: any) => {
                    resp.projects.forEach((project) => {
                      // tslint:disable-next-line: no-shadowed-variable
                      const { id, name, url } = project;

                      this.loginService.projects.projectIds.push(id);
                      this.loginService.projects.projectUrls.push(url);
                      this.loginService.projects.projectNames.push(name);
                    });
                  }),
                  catchError(() => of(false))
              );
  }

  public deleteProject(projectId: number, projectUrl: string, indice: number) {
    return this.http.delete(`${this.url}/project/${projectUrl}/${projectId}`, {
                headers: { Authorization: this.token}})
                      .pipe(
                        tap((resp: any) => {
                          this.loginService.projects.projectIds.splice(indice, 1);
                          this.loginService.projects.projectUrls.splice(indice, 1);
                          this.loginService.projects.projectNames.splice(indice, 1);
                        }),

                      );
  }
}