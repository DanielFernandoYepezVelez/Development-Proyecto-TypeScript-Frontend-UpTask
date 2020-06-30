import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { IProject } from '../../models/IProject';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  nameProject: IProject = { name: '' };
  /* Emitir Evento Del Hijo(app-project) Al Padre(app-aside) Para Compartir Los Nuevos Proyectos En La Barra Lateral */
  @Output() projectsAgain: EventEmitter<IProject[]>;

  constructor(private projectService: ProjectService) {
    this.projectsAgain = new EventEmitter();
  }

  ngOnInit(): void {}

  newProject(e) {
    e.preventDefault();

    this.projectService.createProject('newproject', this.nameProject).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok === true) {
          this.nameProject.name = '';
          this.againProjects();
        }
      },
      (err) => console.log(err)
    );

    return false;
  }

  againProjects() {
    this.projectService.projects('projects').subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          // console.log(res.projects);
          this.projectsAgain.emit(res.projects);
        }
      },
      (err) => console.log(err)
    );
  }
}
