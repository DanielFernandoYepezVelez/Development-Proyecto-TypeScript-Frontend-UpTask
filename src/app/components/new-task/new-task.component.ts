import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { TaskService } from '../../services/task.service';
import { ITask } from '../../models/ITask';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css'],
})
export class NewTaskComponent implements OnInit {
  urlProject: string;
  nameProject: string;
  idProject: string;
  valueTask: ITask = { task: '' };

  constructor(
    private activatedRouter: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((params) => {
      const { project_url, project_name, project_id } = params;

      this.urlProject = project_url;
      this.nameProject = project_name;
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
          console.log(res);
          if (res.ok) {
            this.router.navigate([`/homeProjects`]);
          }
        },
        (err) => console.log(err)
      );
  }
}
