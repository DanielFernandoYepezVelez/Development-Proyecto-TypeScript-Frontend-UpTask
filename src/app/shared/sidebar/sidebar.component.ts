import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

/* Services */
import { TaskService } from '../../pages/services/task.service';
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private landingPage: HTMLElement;
  private asideContainer: HTMLElement;
  private projectComplete: HTMLBodyElement;

  get projectNames(): string[] {
    return this.loginService.projects.projectNames;
  }

  constructor(private loginService: LoginService, private taskService: TaskService, private router: Router) { }

  public ngOnInit(): void {
    this.asideContainer = document.querySelector('#aside');
    this.landingPage = document.querySelector('#landing__page');
    this.projectComplete = document.querySelector('#project__complete');

    /* Project Complete New Width */
    this.projectComplete.classList.add('body__menu--hidden');
  }

  public hiddenAside(): void {
    if(this.asideContainer.classList.contains('aside__hidden')) {

      /* Aside Hidden All */
      this.asideContainer.className = 'aside';

      /* Template Main Grid Modified */
      this.landingPage.className = 'main__dashboard';

      /* Project Complete New Width */
      this.projectComplete.classList.add('body__menu--hidden');
    } else {

      /* Aside Hidden All */
      this.asideContainer.className = 'aside__hidden';

      /* Template Main Grid Modified */
      this.landingPage.className = 'main__dashboard--hidden';

      /* Project Complete New Width */
      this.projectComplete.classList.remove('body__menu--hidden');
    }
  }

  public showProject(indice: number) {
    const projectId = this.loginService.projects.projectIds[indice];
    const projectUrl = this.loginService.projects.projectUrls[indice];

    this.taskService.tasks(projectId).subscribe(
       () => this.router.navigateByUrl(`/dashboard/tasks/${indice}/${projectUrl}/${projectId}`));
  }
}