import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUserSignIn } from '../../models/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  user: IUserSignIn = { email: '', password: '' };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  dataUserSignin(e) {
    e.preventDefault();

    this.userService.signIn(this.user).subscribe(
      (res: any) => {
        // console.log(res);

        if (res.ok === true) {
          localStorage.setItem('tokenUser', JSON.stringify(res.tokenUser));
          this.router.navigate(['/newProject']);
        }
      },
      (err) => console.log(err)
    );
  }
}
