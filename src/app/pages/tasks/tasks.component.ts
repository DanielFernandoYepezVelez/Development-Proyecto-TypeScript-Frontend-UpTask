import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

/* Services */
import { LoginService } from '../../auth/services/login.service';
import { ProjectService } from '../services/project.service';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css', '../css/pages.component.css']
})
export class TasksComponent {
  /*
   * Task Form Variables
   */
  public formForma: FormGroup;
  private formNameTaskSubmitted = false;

  get titleProject(): string[] {
    return this.loginService.projects.projectNames;
  }

  get indexProject(): number {
    // tslint:disable-next-line: radix
    return parseInt(this.activatedRoute.snapshot.paramMap.get('indice'));
  }

    get projectUrl(): string {
    return this.loginService.projects.projectUrls[this.indexProject];
  }

  get projectId(): number {
    return this.loginService.projects.projectIds[this.indexProject];
  }

  get taskNames(): string[] {
    return this.taskService.task?.taskNames;
  }

  /*
   * Coditionals DOM
   */
  public get conditionalNameHTML(): boolean { 
    return this.formForma.get('name').invalid && this.formForma.get('name').dirty;
  }

  public get requiredNameHTML(): boolean {
    return this.formNameTaskSubmitted && !this.formForma.get('name').dirty && !this.formForma.valid;
  }

  constructor(private router: Router, private activatedRoute: ActivatedRoute,
              private projectService: ProjectService, private loginService: LoginService,
              private taskService: TaskService, private formBuilder: FormBuilder) {
              this.taskFormDataBuild();
              }

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
    this.taskService.createTask(this.formForma.value.name, this.projectId)
        .subscribe();

    this.formForma.reset();
  }

  /**
   * State Update Task Backend
   */
  public updateTask() {
    console.log("Actualizando El Estado De La Tarea");
  }

  /**
   * Delete Task For Backend
   */
  public deleteTask(index: number): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Las Tareas Eliminadas No Se Pueden Recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Definitivamente!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService.deleteTask(this.taskService.task.taskIds[index], index)
            .subscribe();

        Swal.fire(
          'Eliminado!',
          'Tu Archivo Fue Eliminado.',
          'success'
        )}
    });
  }

  /**
   * Update Project For Backend
   */
  public updateProject(): void {
    this.router.navigateByUrl(`/dashboard/project/${this.indexProject}/${this.projectUrl}/${this.projectId}`);
  }

  /**
   * Delete Task For Backend
   */
  public deleteProject(): void {
    Swal.fire({
      title: 'Estas Seguro?',
      text: 'Los Proyectos Eliminadas No Se Pueden Recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar Definitivamente!',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService.deleteProject(this.projectId, this.projectUrl, this.indexProject)
            .subscribe(() => this.router.navigateByUrl('/dashboard'));

        Swal.fire(
          'Eliminado!',
          'Tu Archivo Fue Eliminado.',
          'success'
        );
      }});
  }
}
