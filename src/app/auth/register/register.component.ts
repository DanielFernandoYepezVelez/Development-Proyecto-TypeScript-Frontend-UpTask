import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../css/auth.component.css'],
})
export class RegisterComponent implements OnInit {
  private name: HTMLInputElement;
  private email: HTMLInputElement;
  private labels: HTMLCollectionBase;
  private password: HTMLInputElement;

  constructor() {}

  ngOnInit(): void {
    this.name = document.querySelector('#name');
    this.email = document.querySelector('#email');
    this.labels = document.querySelectorAll('label');
    this.password = document.querySelector('#password');
  }

  public inputName(): void {
    this.name.addEventListener('blur', () => {
      const valueName: string = this.name.value;

      if (valueName.length) {
        this.labels[0].classList.add('label__finally');
      } else {
        this.labels[0].classList.remove('label__finally');
      }
    });
  }

  public inputEmail(): void {
    this.email.addEventListener('blur', () => {
      const valueEmail: string = this.email.value;

      if (valueEmail.length) {
        this.labels[1].classList.add('label__finally');
      } else {
        this.labels[1].classList.remove('label__finally');
      }
    });
  }

  public inputPassword(): void {
    this.password.addEventListener('blur', () => {
      const valuePassword = this.password.value;

      if (valuePassword.length) {
        this.labels[2].className = 'label__finally';
      } else {
        this.labels[2].classList.remove('label__finally');
      }
    });
  }
}
