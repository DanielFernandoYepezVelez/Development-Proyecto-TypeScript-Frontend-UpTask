import { Component, OnInit } from '@angular/core';

import { IProject } from '../../models/IProject';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-home-projects',
  templateUrl: './home-projects.component.html',
  styleUrls: ['./home-projects.component.css'],
})
export class HomeProjectsComponent implements OnInit {
  title = 'Proyectos';
  projects: IProject[] = [];

  constructor(private projectService: ProjectService) {
    this.projectService.projects('projects').subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok === true) {
          this.projects = res.projects;
        }
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}

  close() {}
}
