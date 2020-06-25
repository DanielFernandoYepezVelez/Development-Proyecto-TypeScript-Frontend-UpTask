import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Components */
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { AsideComponent } from './components/shared/aside/aside.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { NewProjectComponent } from './components/new-project/new-project.component';

/* Rutas */
import { AppRoutingModule } from './app.routing';

/* Services */
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    TasksComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    NavbarComponent,
    ProjectsComponent,
    NewProjectComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [ProjectService, TaskService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
