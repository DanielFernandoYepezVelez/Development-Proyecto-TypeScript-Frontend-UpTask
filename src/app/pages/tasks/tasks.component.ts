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

  get paramsURL(): string {
    return this.activatedRoute.snapshot.paramMap.get('indice');
  }

  get taskNames(): string[] {
    return this.taskService.task.taskNames;
  }

  /*
   * Task Form Variables
   */
  public formForma: FormGroup;
  private formNameTaskSubmitted = false;

  /*
   * Coditionals DOM
   */
  public get conditionalNameHTML(): boolean { 
    return this.formForma.get('name').invalid && this.formForma.get('name').dirty;
  }

  public get requiredNameHTML(): boolean {
    return this.formNameTaskSubmitted && !this.formForma.get('name').dirty && !this.formForma.valid;
  }

  constructor(public activatedRoute: ActivatedRoute,
              private loginService: LoginService,
              public taskService: TaskService,
              private formBuilder: FormBuilder) {
              this.taskFormDataBuild();
              }

  ngOnInit(): void { }

  /**
   * Task Form Build
   */
  private taskFormDataBuild(): void {
    this.formForma = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  /**
   * Task Form Send For Backend
   */
  public taskFormDataSaved(): void {
    if(this.formForma.status === 'INVALID' || this.formForma.dirty === false || this.formForma.valid === false) {
      this.formNameTaskSubmitted = true;
      return;
    }

    /* Send Data For Backend, If Is Right! */
    const projectId = this.activatedRoute.snapshot.paramMap.get('projectId')
    this.taskService.createTask(this.formForma.value.name, projectId).subscribe();
    this.formForma.reset();
  }
}
