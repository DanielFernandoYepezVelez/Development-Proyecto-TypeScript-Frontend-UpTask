import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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

  constructor(
    private activatedRouter: ActivatedRoute,
    private taskService: TaskService,
    private router: Router
  ) {
    this.activatedRouter.params.subscribe((params) => {
      const { project_id } = params;
      this.idProject = project_id;
    });

    this.taskService.getTasks('tasks', this.idProject).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          this.tasks = res.tasks;
        }
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}
}
