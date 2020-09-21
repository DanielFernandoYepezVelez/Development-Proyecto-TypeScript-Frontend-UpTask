import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

/* Routing Modules */
import { AppRoutingModule } from './app-routing.module';

/* Component Modules */
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';

/* Components */
import { AppComponent } from './app.component';
import { Page404Component } from './page404/page404.component';

@NgModule({
  declarations: [
    AppComponent,
    Page404Component,
  ],
  imports: [
    AuthModule,
    PagesModule,
    BrowserModule,
    AppRoutingModule,
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }