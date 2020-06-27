import { Component, OnInit } from '@angular/core';

import { IProject } from '../../models/IProject';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  nameProject: IProject = { name: '' };
  projects: IProject[] = [];

  constructor(private projectService: ProjectService) {}

  ngOnInit(): void {}

  newProject(e) {
    e.preventDefault();

    this.projectService.createProject('newproject', this.nameProject).subscribe(
      (res) => {
        console.log(res);

        this.nameProject.name = '';
        this.projectsAgain();
      },
      (err) => console.log(err)
    );
  }

  projectsAgain() {
    this.projectService.projects('projects').subscribe(
      (res: any) => {
        console.log(res);

        if (res.ok === true) {
          this.projects = res.projects;
          console.log(this.projects);
        }
      },
      (err) => console.log(err)
    );
  }
}
