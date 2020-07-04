import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { ProjectService } from '../../services/project.service';

import { IProject } from '../../models/IProject';

@Component({
  selector: 'app-list-project',
  templateUrl: './list-project.component.html',
  styleUrls: ['./list-project.component.css'],
})
export class ListProjectComponent implements OnInit {
  title = 'Listar Tareas';
  titleProject: string;
  urlProject: string;
  idProject: string;
  projects: IProject[] = [];

  constructor(
    private projectService: ProjectService,
    private activatedRouter: ActivatedRoute,
    private router: Router
  ) {
    this.projectService.projects('projects').subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok === true) {
          this.projects = res.projects;
        }
      },
      (err) => console.log(err)
    );

    /* Obtener Parametros Por La Url */
    this.activatedRouter.params.subscribe((params) => {
      const { project_url, project_name, project_id } = params;

      this.titleProject = project_name;
      this.urlProject = project_url;
      this.idProject = project_id;
    });
  }

  ngOnInit(): void {}

  getProjectUrl(e, projectUrl, projectName, projectId) {
    e.preventDefault();

    this.projectService.project('project/url', projectUrl).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          this.router.navigate([
            `/listProject/${projectUrl}/${projectName}/${projectId}`,
          ]);
        }
      },
      (err) => console.log(err)
    );
  }

  deleteProject(e) {
    e.preventDefault();

    Swal.fire({
      title: '¿Eliminar Proyecto?',
      text: 'Todo Proyecto Eliminado No Se Puede Recuperar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, Eliminar!',
    }).then((result) => {
      if (result.value) {
        this.projectService
          .deleteProject('project', this.urlProject, this.idProject)
          .subscribe(
            (res) => {
              // console.log(res);
            },
            (err) => console.log(err)
          );

        Swal.fire('Eliminado!', 'Tu Proyecto Fue Eliminado.', 'success');

        setTimeout(() => {
          this.router.navigate(['/homeProjects']);
        }, 1000);
      }
    });
  }
}
