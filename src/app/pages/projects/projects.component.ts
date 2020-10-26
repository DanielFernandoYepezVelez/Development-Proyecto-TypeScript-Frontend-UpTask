import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Services */
import { ProjectService } from '../services/project.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['../css/pages.component.css'],
})
export class ProjectsComponent {
  /**
   * Project Form Variables
   */
  public formForma: FormGroup;
  private formNameProjectSubmitted = false;

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
      this.formNameProjectSubmitted &&
      !this.formForma.get('name').dirty &&
      !this.formForma.valid
    );
  }

  constructor(
    private formBuilder: FormBuilder,
    private projectService: ProjectService,
    private router: Router
  ) {
    this.projectFormDataBuild();
  }

  /**
   * Project Form Build
   */
  private projectFormDataBuild(): void {
    this.formForma = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  /**
   * Project Form Send For Backend
   */
  public projectFormDataSaved(): void {
    if (
      this.formForma.status === 'INVALID' ||
      this.formForma.dirty === false ||
      this.formForma.valid === false
    ) {
      this.formNameProjectSubmitted = true;
      return;
    }

    /* Send Data For Backend, If Is Right! */
    this.projectService.createProject(this.formForma.value.name).subscribe(
      () => {
        this.router.navigateByUrl('/dashboard');
      },
      (error) => console.log(error)
    );
  }
}
