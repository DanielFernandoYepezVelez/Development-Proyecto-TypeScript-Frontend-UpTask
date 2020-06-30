import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { IProject } from '../../models/IProject';
import { ProjectService } from '../../services/project.service';

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
    private activatedRouter: ActivatedRoute
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

  deleteProject(e) {
    e.preventDefault();
    Swal.fire('Eliminando Proyecto!');
    console.log('Eliminado Proyecto');
  }
}
