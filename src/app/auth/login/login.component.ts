import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../css/auth.component.css'],
})
export class LoginComponent implements OnInit {
  private email: HTMLInputElement;
  private password: HTMLInputElement;
  private labels: HTMLCollectionBase;

  constructor() {}

  ngOnInit(): void {
    this.email = document.querySelector('#email');
    this.labels = document.querySelectorAll('label');
    this.password = document.querySelector('#password');
  }

  public inputEmail(): void {
    this.email.addEventListener('blur', () => {
      const valueEmail: string = this.email.value;

      if (valueEmail.length) {
        this.labels[0].classList.add('label__finally');
      } else {
        this.labels[0].classList.remove('label__finally');
      }
    });
  }

  public inputPassword(): void {
    this.password.addEventListener('blur', () => {
      const valuePassword: string = this.password.value;

      if (valuePassword.length) {
        this.labels[1].classList.add('label__finally');
      } else {
        this.labels[1].classList.remove('label__finally');
      }
    });
  }
}
