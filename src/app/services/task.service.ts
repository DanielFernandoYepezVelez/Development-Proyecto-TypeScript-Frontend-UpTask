import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {
  getTask() {
    console.log('Servicio De Tareas');
  }
}
