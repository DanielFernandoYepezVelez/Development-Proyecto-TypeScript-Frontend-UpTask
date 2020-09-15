import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';

/* Components */
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, RegisterComponent],
  imports: [AuthRoutingModule],
  exports: [LoginComponent, RegisterComponent],
})
export class AuthModule {}
