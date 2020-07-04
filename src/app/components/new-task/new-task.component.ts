import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';

import { ITask } from '../../models/ITask';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  idProject: string;
  valueTask: ITask = { task: '' };
  /* Emitir Evento Del Hijo(app-new-task) Al Padre(app-tasks) Para Compartir Las Nuevas Tareas En La Vista Principal */
  @Output() tasksAgain: EventEmitter<ITask[]>;

  constructor(
    private activatedRouter: ActivatedRoute,
    private taskService: TaskService
  ) {
    this.tasksAgain = new EventEmitter();

    this.activatedRouter.params.subscribe((params) => {
      const { project_id } = params;

      this.idProject = project_id;
    });
  }

  ngOnInit(): void {}

  saveTask(e) {
    e.preventDefault();
    this.taskService
      .createTask('newTask', this.idProject, this.valueTask)
      .subscribe(
        (res: any) => {
          // console.log(res);
          if (res.ok) {
            this.valueTask.task = '';
            this.resquestTasksAgain();
          }
        },
        (err) => console.log(err)
      );
  }

  resquestTasksAgain() {
    this.taskService.getTasks('tasks', this.idProject).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          this.tasksAgain.emit(res.tasks);
        }
      },
      (err) => console.log(err)
    );
  }
}
