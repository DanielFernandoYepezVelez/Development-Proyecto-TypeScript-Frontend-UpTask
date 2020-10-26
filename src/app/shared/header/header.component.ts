import { Component } from '@angular/core';

/* Services */
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private loginService: LoginService) {}

  public logout(): void {
    this.loginService.logout();
  }
}
