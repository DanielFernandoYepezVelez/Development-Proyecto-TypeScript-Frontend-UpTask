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

  private getQueryParams(query: string, params: string) {
    const url = `http://localhost:3001/api/${query}/${params}`;

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

  private putQuery(
    query: string,
    projectUrl: string,
    projectid: string,
    body: object
  ) {
    const nameProject = body;
    const url = `http://localhost:3001/api/${query}/${projectUrl}/${projectid}`;

    const headers = new HttpHeaders({
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokenUser'))}`,
    });

    return this.http.put(url, nameProject, { headers });
  }

  projects(query: string) {
    return this.getQuery(query);
  }

  createProject(query: string, body: object) {
    return this.postQuery(query, body);
  }

  project(query: string, params: string) {
    return this.getQueryParams(query, params);
  }

  updateProject(
    query: string,
    projectUrl: string,
    projectid: string,
    body: object
  ) {
    return this.putQuery(query, projectUrl, projectid, body);
  }
}
