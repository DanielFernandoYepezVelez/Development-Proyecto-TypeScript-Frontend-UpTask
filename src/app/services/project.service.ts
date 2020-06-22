import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ProjectService {
  getProjects() {
    console.log('Servicio Para Los Proyectos');
  }
}
