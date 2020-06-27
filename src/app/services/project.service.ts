import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ProjectService {
  constructor(private http: HttpClient) {}

  private getQuery(query: string) {
    const url = `http://localhost:3001/api/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenUser'))}`,
    });

    return this.http.get(url, { headers });
  }

  private postQuery(query: string, body: object) {
    const name = body;
    const url = `http://localhost:3001/api/${query}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenUser'))}`,
    });

    return this.http.post(url, name, { headers });
  }

  projects(query: string) {
    return this.getQuery(query);
  }

  createProject(query: string, body: object) {
    return this.postQuery(query, body);
  }
}
