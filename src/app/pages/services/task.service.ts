import { from, Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

/* Interfaces */
import { ITask } from '../interfaces/task.interface';

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
   * LOGICA PARA UN SERVICIO SINGLETON Y CREAR LAS TAREAS PARA TODO EL PROYECTO
   */
  public createTask(name: ITask, projectId: number): Observable<object> {
    return this.http.post(`${this.url}/task/${projectId}`, { name }, {
               headers: { Authorization: this.token }})
                      .pipe(
                        tap((res: any) => {
                          this.task.taskIds.length = 0;
                          this.task.taskNames.length = 0;
                          this.task.taskStates.length = 0;

                          const arrayTaskIds: number[] = [];
                          const arrayTaskNames: string[] = [];
                          const arrayTaskStates: number[] = [];

                          res.tasks.forEach(task => {
                            arrayTaskIds.push(task.id);
                            arrayTaskNames.push(task.task);
                            arrayTaskStates.push(task.state);
                          });

                          this.task.taskIds = arrayTaskIds;
                          this.task.taskNames = arrayTaskNames;
                          this.task.taskStates = arrayTaskStates;
                        }),
                        catchError(() => of(false)),
                      );
  }

  /**
   * Task Delete
   * LOGICA PARA UN SERVICIO SINGLETON Y ELIMINAR LAS TAREAS PARA TODO EL PROYECTO
   */
  public deleteTask(taskId: number, indice: number): Observable<object> {
    return this.http.delete(`${this.url}/task/${taskId}`, {
       headers: { Authorization: this.token }})
                  .pipe(
                    tap(() => {
                        this.task.taskIds.splice(indice, 1);
                        this.task.taskNames.splice(indice, 1);
                        this.task.taskStates.splice(indice, 1);
                    }),
                  );
  }
}
