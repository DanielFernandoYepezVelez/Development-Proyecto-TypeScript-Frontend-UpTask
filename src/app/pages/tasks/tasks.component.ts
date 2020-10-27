import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

/* Services */
import { TaskService } from '../services/task.service';
import { ProjectService } from '../services/project.service';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css', '../css/pages.component.css'],
})
export class TasksComponent {
  /*
   * Task Form Variables
   */
  public valueFinal: number;
  public formForma: FormGroup;
  private formNameTaskSubmitted = false;

  get taskNames(): string[] {
    return this.taskService.task?.taskNames;
  }

  get titleProject(): string[] {
    return this.loginService.projects.projectNames;
  }

  get projectId(): number {
    return this.loginService.projects.projectIds[this.indexProject];
  }

  get projectUrl(): string {
    return this.loginService.projects.projectUrls[this.indexProject];
  }

  get indexProject(): number {
    // tslint:disable-next-line: radix
    return parseInt(this.activatedRoute.snapshot.paramMap.get('indice'));
  }

  /*
   * Coditionals DOM
   */
  public get conditionalNameHTML(): boolean {
    return (
      this.formForma.get('name').invalid && this.formForma.get('name').dirty
    );
  }

  public get requiredNameHTML(): boolean {
    return (
      this.formNameTaskSubmitted &&
      !this.formForma.get('name').dirty &&
      !this.formForma.valid
    );
  }

  constructor(
    private router: Router,
    public taskService: TaskService,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    private activatedRoute: ActivatedRoute,
    private projectService: ProjectService
  ) {
    this.taskFormDataBuild();
  }

  /**
   * Task Form Build
   */
  private taskFormDataBuild(): void {
    this.formForma = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Task Form Send For Backend
   */
  public taskFormDataSaved(): void {
    if (
      this.formForma.status === 'INVALID' ||
      this.formForma.dirty === false ||
      this.formForma.valid === false
    ) {
      this.formNameTaskSubmitted = true;
      return;
    }

    /* Send Data For Backend, If Is Right! */
    this.taskService
      .createTask(this.formForma.value.name, this.projectId)
      .subscribe();

    this.formForma.reset();
  }

  /**
   * State Update Task Backend
   */
  public updateTask(index: number) {
    this.taskService
      .updateTask(this.taskService.task.taskIds[index], index)
      .subscribe();
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
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.taskService
          .deleteTask(this.taskService.task.taskIds[index], index)
          .subscribe();

        Swal.fire('Eliminado!', 'Tu Tarea Fue Eliminada.', 'success');
      }
    });
  }

  /**
   * Update Project For Backend
   */
  public updateProject(): void {
    this.router.navigateByUrl(
      `/dashboard/project/${this.indexProject}/${this.projectUrl}/${this.projectId}`
    );
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
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.projectService
          .deleteProject(this.projectId, this.projectUrl, this.indexProject)
          .subscribe(() => this.router.navigateByUrl('/dashboard'));

        Swal.fire('Eliminado!', 'Tu Archivo Fue Eliminado.', 'success');
      }
    });
  }
}
