import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { IUserSignUp } from '../../models/IUser';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  user: IUserSignUp = { name: '', email: '', password: '' };

  constructor(private router: Router, private userService: UserService) {}

  ngOnInit(): void {}

  dataUserSignUp(e) {
    e.preventDefault();

    this.userService.signUp(this.user).subscribe(
      (res: any) => {
        // console.log(res);
        if (res.ok === true) {
          setTimeout(() => {
            this.router.navigate(['/signIn']);
          }, 1000);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
