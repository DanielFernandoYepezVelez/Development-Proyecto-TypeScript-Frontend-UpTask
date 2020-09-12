import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

/* Routing Modules(childs) */
import { PagesRoutingModule } from './pages/pages-routing.module';
import { AuthRoutingModule } from './auth/auth-routing.module';

/* Components */
import { Page404Component } from './page404/page404.component';

const routes: Routes = [  
  /* path: '/dashboard' PagesRouting */
  /* path: '/auth' AuthRouting */
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: '**', component: Page404Component }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule
  ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }