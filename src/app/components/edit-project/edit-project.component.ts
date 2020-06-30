import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { IProject } from '../../models/IProject';
import { ProjectService } from '../../services/project.service';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrls: ['./edit-project.component.css'],
})
export class EditProjectComponent implements OnInit {
  projectUrl: string;
  projectId: string;
  projectName: string;
  projects: IProject[] = [];
  projectNameOutput: IProject = { name: '' };

  constructor(
    private projectService: ProjectService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      const { project_url, project_id } = params;
      this.projectUrl = project_url;
      this.projectId = project_id;
    });

    this.projectService.projects('projects').subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok === true) {
          this.projects = res.projects;
        }
      },
      (err) => console.log(err)
    );

    this.projectService.project('project/url', this.projectUrl).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok) {
          // console.log(res.project[0].name);
          this.projectName = res.project[0].name;
        }
      },
      (err) => console.log(err)
    );
  }

  ngOnInit(): void {}

  updateProject(e) {
    e.preventDefault();

    if (this.projectNameOutput.name === '') {
      this.projectNameOutput.name = this.projectName;
    }

    this.projectService
      .updateProject(
        'project',
        this.projectUrl,
        this.projectId,
        this.projectNameOutput
      )
      .subscribe(
        (res: any) => {
          // console.log(res);
          if (res.ok) {
            this.projectNameOutput.name = '';
            this.router.navigate(['/homeProjects']);
          }
        },
        (err) => console.log(err)
      );
  }
}
