import { Component } from '@angular/core';

/* Services */
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css'],
})
export class ProgressComponent {
  private valueTask = 0;

  get valueFinal(): number {
    let acSuma = 0;
    this.valueTask = 0;

    this.taskService.task?.taskStates.forEach((elemento) => {
      if (elemento === 1) {
        acSuma += 1;
        this.valueTask =
          (acSuma * 100) / this.taskService.task.taskStates.length;
      }
    });

    return this.valueTask;
  }

  constructor(private taskService: TaskService) {}
}
