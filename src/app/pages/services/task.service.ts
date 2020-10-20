import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { ITask } from '../../models/ITask';

/* Model For All Project UPTASK */
import { Task } from '../models/task.model';

/* Variables De Entorno */
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  public task: Task;
  private url: string = environment.baseUrl;

  get token(): string {
    return `Bearer ${localStorage.getItem('token') || ''}`;
  }

  constructor(private http: HttpClient) { }

  /**
   * Get Tasks
   * LOGICA PARA UN SERVICIO SINGLETON Y OBTENER LAS TAREAS PARA TODO EL PROYECTO
   */
  public tasks(projectId: number): Observable<object> {
    return this.http.get(`${this.url}/tasks/${projectId}`, {
      headers: { Authorization: this.token }})
              .pipe(
                tap((resp: any) => {
                  let taskProjectId: number;
                  const arrayId: number[] = [];
                  const arrayName: string[] = [];
                  const arrayState: number[] = [];

                  resp.tasks.forEach(taskComplete => {
                    const {id, task, state, project_id } = taskComplete;

                    arrayId.push(id);
                    arrayName.push(task);
                    arrayState.push(state);
                    taskProjectId = project_id;
                  });

                  this.task = new Task(arrayId, arrayName, arrayState, taskProjectId);
                }),
                catchError(() => of(false)),
              );
  }

  /**
   * Task Create
   */
  public createTask(name: ITask, projectId: string): Observable<object> {
    return this.http.post(`${this.url}/task/${projectId}`, { name }, {
               headers: { Authorization: this.token }})
                      .pipe(
                        tap((res: any) => {
                          this.task.taskNames.length = 0;
                          const arrayTaskNames: string[] = [];

                          res.tasks.forEach(task => {
                            arrayTaskNames.push(task.task);
                          });

                          this.task.taskNames = arrayTaskNames;
                        })
                      );
  }
}
