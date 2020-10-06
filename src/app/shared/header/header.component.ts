import { Component } from '@angular/core';
import { Router } from '@angular/router';

/* Services */
import { LoginService } from '../../auth/services/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private loginService: LoginService, private router: Router) { }

  public logout(): void {
    this.loginService.logout();
    this.router.navigateByUrl('/login');
  }
}
