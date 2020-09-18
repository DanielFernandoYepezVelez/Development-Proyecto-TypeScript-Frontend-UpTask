import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  private landingPage: HTMLElement;
  private asideContainer: HTMLElement;
  private formProject: HTMLFormElement;
  private projectComplete: HTMLBodyElement;

  constructor() { }

  public ngOnInit(): void {
    this.asideContainer = document.querySelector('#aside');
    this.landingPage = document.querySelector('#landing__page');
    this.formProject = document.querySelector('#article__form');
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

      /* New Height Form */
      this.formProject.className = 'article__form';

      /* Project Complete New Width */
      this.projectComplete.classList.add('body__menu--hidden');
    } else {

      /* Aside Hidden All */
      this.asideContainer.className = 'aside__hidden';
    
      /* Template Main Grid Modified */
      this.landingPage.className = 'main__dashboard--hidden';

      /* New Geight Form */
      this.formProject.classList.add('article__form--hidden');

      /* Project Complete New Width */
      this.projectComplete.classList.remove('body__menu--hidden');
    }
  }
}