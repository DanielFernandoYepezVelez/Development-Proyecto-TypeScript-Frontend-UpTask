import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";

/* Componets Module */
import { SharedModule } from '../shared/shared.module';

/* Components Pages */
import { TasksComponent } from './tasks/tasks.component';
import { LandingPageComponent } from './landing-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';

@NgModule({
  declarations: [
    TasksComponent,
    LandingPageComponent,
    ProjectsComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule
  ],
  exports: [ 
    TasksComponent,
    LandingPageComponent,
    ProjectsComponent,
    DashboardComponent,
  ]
})
export class PagesModule { }
