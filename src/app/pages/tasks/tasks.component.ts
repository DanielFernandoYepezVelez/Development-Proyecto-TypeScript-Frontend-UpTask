import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms'

/* Model For All Project UPTASK */
import { Task } from '../models/task.model';

/* Services */
import { LoginService } from '../../auth/services/login.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css', '../css/pages.component.css']
})
export class TasksComponent implements OnInit {
  get titleProject(): string[] {
    return this.loginService.projects.projectNames;
  }

  /*
   * Project Form Task Variables
   */
  public formForma: FormGroup;
  private formNameTaskSubmitted = false;

  constructor(public activatedRoute: ActivatedRoute, private loginService: LoginService, public taskService: TaskService) { }

  ngOnInit(): void { }
}
