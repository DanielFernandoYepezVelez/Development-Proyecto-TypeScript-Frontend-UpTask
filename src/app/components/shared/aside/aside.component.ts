import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IProject } from '../../../models/IProject';
import { ProjectService } from '../../../services/project.service';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css'],
})
export class AsideComponent implements OnInit {
  projects: IProject[] = [];

  constructor(private projectService: ProjectService, private router: Router) {
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

  requestAgain(evento) {
    // console.log('evento =>', evento);
    this.projects = evento;
    this.router.navigate(['/homeProjects']);
    return false;
  }
}
