import Swal from 'sweetalert2';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Services */
import { ProjectService } from '../../services/project.service';
import { LoginService } from '../../../auth/services/login.service';

@Component({
  selector: 'app-project-update',
  templateUrl: './project-update.component.html',
  styleUrls: ['./project-update.component.css', '../../css/pages.component.css']
})
export class ProjectUpdateComponent {
  /*
   * Update Project Form Variables
   */
  public formForma: FormGroup;
  private formUpdateProjectSubmitted = false;

  get titleProject(): string {
    return this.loginService.projects.projectNames[this.indexProject];
  }

  get urlProject(): string {
    return this.activatedRoute.snapshot.paramMap.get('projectUrl');
  }

  get idProject(): number {
    // tslint:disable-next-line: radix
    return parseInt(this.activatedRoute.snapshot.paramMap.get('projectId'));
  }

  get indexProject(): number {
    // tslint:disable-next-line: radix
    return parseInt(this.activatedRoute.snapshot.paramMap.get('indice'));
  }

  /*
   * Coditionals DOM
   */
  public get conditionalNameHTML(): boolean { 
    return this.formForma.get('name').invalid && this.formForma.get('name').dirty;
  }

  public get requiredNameHTML(): boolean {
    return this.formUpdateProjectSubmitted && !this.formForma.get('name').dirty && !this.formForma.valid;
  }

  constructor(private loginService: LoginService, private activatedRoute: ActivatedRoute,
              private formBuilder: FormBuilder, private projectService: ProjectService,
              private router: Router) {
    this.projectFormDataBuild();
  }

  /*
   * Update Project Form Builder
   */
  private projectFormDataBuild(): void {
    this.formForma = this.formBuilder.group({
      name: [this.titleProject, [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Update Project Form Send For Backend
   */
  public projectUpdateFormDataSaved(): void {
    if (this.formForma.status === 'INVALID' || this.formForma.valid === false) {
      this.formUpdateProjectSubmitted = true;
      return;
    }

    /* Send Data For Backend, If Is Right! */
    this.projectService.updateProject(this.formForma.value.name, this.urlProject, this.idProject, this.indexProject)
        .subscribe(() => {
          this.ShowAlert();
          this.router.navigateByUrl('/dashboard');
        });
    // this.formForma.reset();
  }

  private ShowAlert(): void {
    Swal.fire({
      title: 'Actualizar Proyecto',
      text: 'Proyecto Actualizado Exitosamente!',
      icon: 'success',
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Ok!',
    });
  }
}
