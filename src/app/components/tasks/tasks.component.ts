import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { TaskService } from '../../services/task.service';

import { ITask } from '../../models/ITask';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  idProject: string;
  tasks: ITask[] = [];
  template: number;

  constructor(
    private activatedRouter: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.activatedRouter.params.subscribe((params) => {
      const { project_id } = params;
      this.idProject = project_id;

      this.init();
    });
  }

  ngOnInit(): void {}

  init() {
    this.taskService.getTasks('tasks', this.idProject).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          this.tasks = res.tasks;
          this.template = res.tasks.length;
        }
      },
      (err) => console.log(err)
    );
  }

  tasksSecond(evento) {
    // console.log('evento =>', evento);
    this.template = evento.length;
    this.tasks = evento;
  }

  taskUpdate(e, idTask) {
    e.preventDefault();

    this.taskService.updateTask('task', idTask).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok === true) {
          this.init();
        }
      },
      (err) => console.log(err)
    );
  }

  taskDelete(e, idTask: string | number) {
    e.preventDefault();

    Swal.fire({
      title: '¿Eliminar Tarea?',
      text: 'Toda Tarea Eliminada No Se Puede Recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.value) {
        this.serviceTaskDelete(idTask);
        Swal.fire('Eliminado!', 'Tu Tarea Fue Eliminada!', 'success');
      }
    });
  }

  serviceTaskDelete(idTask) {
    this.taskService.deleteTask('task', idTask).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          this.init();
        }
      },
      (err) => console.log(err)
    );
  }
}
