import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/* Components */
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { HomeProjectsComponent } from './components/home-projects/home-projects.component';

const routes: Routes = [
  { path: 'signIn', component: SigninComponent },
  { path: 'signUp', component: SignupComponent },
  { path: 'newProject', component: NewProjectComponent },
  { path: 'homeProjects', component: HomeProjectsComponent },
  {
    path: 'editProject/:project_url/:project_id',
    component: EditProjectComponent,
  },
  {
    path: 'listProject/:project_url/:project_name/:project_id',
    component: ListProjectComponent,
  },
  { path: '', redirectTo: '/signUp', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
