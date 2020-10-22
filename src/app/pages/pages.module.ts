import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

/* Componets Module */
import { SharedModule } from '../shared/shared.module';

/* Components Pages */
import { TasksComponent } from './tasks/tasks.component';
import { LandingPageComponent } from './landing-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProjectUpdateComponent } from './components/project-update/project-update.component';

@NgModule({
  declarations: [
    TasksComponent,
    LandingPageComponent,
    ProjectsComponent,
    DashboardComponent,
    ProjectUpdateComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [ 
    TasksComponent,
    LandingPageComponent,
    ProjectsComponent,
    DashboardComponent,
  ]
})
export class PagesModule { }
