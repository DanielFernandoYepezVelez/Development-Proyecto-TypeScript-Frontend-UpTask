import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class TaskService {
  constructor(private http: HttpClient) {}

  private getQuery(query: string, idProject: string) {
    const url = `http://localhost:3001/api/${query}/${idProject}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenUser'))}`,
    });

    return this.http.get(url, { headers });
  }

  private postQuery(query: string, idProject: string, nameTask: object) {
    const url = `http://localhost:3001/api/${query}/${idProject}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenUser'))}`,
    });

    return this.http.post(url, nameTask, { headers });
  }

  getTasks(query: string, idProject: string) {
    return this.getQuery(query, idProject);
  }

  createTask(query: string, idProject: string, nameTask: object) {
    return this.postQuery(query, idProject, nameTask);
  }
}
