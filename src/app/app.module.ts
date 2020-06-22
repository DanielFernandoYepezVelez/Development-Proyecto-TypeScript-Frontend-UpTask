import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* Components */
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { AsideComponent } from './components/shared/aside/aside.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';

/* Services */
import { ProjectService } from './services/project.service';
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AsideComponent,
    FooterComponent,
    ProjectsComponent,
    TasksComponent,
    SigninComponent,
    SignupComponent,
  ],
  imports: [BrowserModule],
  providers: [ProjectService, TaskService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
