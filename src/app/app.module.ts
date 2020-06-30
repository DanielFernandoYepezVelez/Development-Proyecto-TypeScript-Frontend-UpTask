import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

/* Components */
import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';
import { ProjectComponent } from './components/project/project.component';
import { AsideComponent } from './components/shared/aside/aside.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { NewTaskComponent } from './components/new-task/new-task.component';
import { NewProjectComponent } from './components/new-project/new-project.component';
import { ListProjectComponent } from './components/list-project/list-project.component';
import { EditProjectComponent } from './components/edit-project/edit-project.component';
import { HomeProjectsComponent } from './components/home-projects/home-projects.component';

/* Rutas */
import { AppRoutingModule } from './app.routing';

/* Services */
import { TaskService } from './services/task.service';
import { UserService } from './services/user.service';
import { ProjectService } from './services/project.service';

@NgModule({
  declarations: [
    AppComponent,
    AsideComponent,
    TasksComponent,
    SigninComponent,
    SignupComponent,
    FooterComponent,
    NavbarComponent,
    ProjectComponent,
    NewTaskComponent,
    NewProjectComponent,
    ListProjectComponent,
    EditProjectComponent,
    HomeProjectsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [ProjectService, TaskService, UserService],
  bootstrap: [AppComponent],
})
export class AppModule {}
