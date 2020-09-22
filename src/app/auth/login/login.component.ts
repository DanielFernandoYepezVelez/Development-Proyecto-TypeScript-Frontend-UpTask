import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../css/auth.component.css'],
})
export class LoginComponent implements OnInit {
  /**
   * Document Object Model
   */
  private inputs: HTMLCollectionBase;
  private labels: HTMLCollectionBase;

  /**
   * Generals Logics Properties
   */
  public formForma: FormGroup;
  public validateOne: boolean = false;
  public validateTwo: boolean = false;
  public validateFour: boolean = false;
  public validateThree: boolean = false;

  constructor(private formBuilder: FormBuilder) {
    this.loginFormDataBuild();
  }

  ngOnInit(): void {
    Array.from((this.inputs = document.querySelectorAll('.main__form input')));
    Array.from((this.labels = document.querySelectorAll('.main__form label')));
  }

  /**
   * Input Field Event DOM
   */
  public input(e): void {
    const value: string = e.target.value;
    const attribute: string = e.target.getAttribute('type');

    switch (attribute) {
      case 'email':
        this.fieldValueTransitionLabel(value, 0, 'label__finally');
        break;

      case 'password':
        this.fieldValueTransitionLabel(value, 1, 'label__finally');
        break;
    }
  }

  /**
   * Login Form Transition Label
   */
  public fieldValueTransitionLabel(
    value: string,
    index: number,
    classCss: string
  ): void {
    if (value.length) {
      this.labels[index].classList.add(classCss);
    } else {
      this.labels[index].classList.remove(classCss);
    }
  }

  /**
   * Login Form Data Build (ANGULAR)
   */
  public loginFormDataBuild(): void {
    this.formForma = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: ['', [Validators.required, Validators.minLength(4)]],
    });
  }

  /**
   * Login Form Get Data And Send To Server
   */
  public loginFormDataSaved(): void {
    if (
      this.formForma.status === 'INVALID' ||
      this.formForma.touched === false ||
      this.formForma.dirty === false ||
      this.formForma.valid === false
    ) {
      Object.values(this.formForma.controls).forEach((controlsField, index) => {
        if (
          controlsField.status === 'INVALID' ||
          controlsField.valid === false
        ) {
          this.inputs[index].classList.add('borderInput');
          this.validateTwo = this.generalConditional('email');
          this.validateFour = this.generalConditional('password');
        }
      });
      return;
    }

    console.log('Send Data To Server');
  }

  /**
   * Login Form Validate Every Input Value
   */
  public validateInput(inputName: string): void {
    switch (inputName) {
      case 'email':
        if (this.generalConditionalThird('email')) {
          this.validateOne = false;
          this.validateTwo = false;
          this.inputs[0].classList.remove('borderInput');
        }

        if (!this.validateTwo) {
          this.validateOne = this.generalConditionalSecond('email');

          if (this.validateOne) {
            this.inputs[0].classList.add('borderInput');
          }
        }
        break;

      case 'password':
        if (this.generalConditionalThird('password')) {
          this.validateThree = false;
          this.validateFour = false;
          this.inputs[1].classList.remove('borderInput');
        }

        if (!this.validateFour) {
          this.validateThree = this.generalConditionalSecond('password');

          if (this.validateThree) {
            this.inputs[1].classList.add('borderInput');
          }
        }
        break;
    }
  }

  /**
   * Big And General Conditional One (VALIDATION INPUT)
   */
  public generalConditional(inputName: string): boolean {
    return (
      this.formForma.get(inputName).status === 'INVALID' &&
      !this.formForma.get(inputName).dirty &&
      this.formForma.get(inputName).untouched &&
      !this.formForma.get(inputName).valid
    );
  }

  /**
   * Big And General Conditional Second (VALIDATION INPUT)
   */
  public generalConditionalSecond(inputName: string): boolean {
    return (
      this.formForma.get(inputName).status === 'INVALID' &&
      this.formForma.get(inputName).dirty &&
      !this.formForma.get(inputName).valid
    );
  }

  /**
   * Big And General Conditional Third (VALIDATION INPUT)
   */
  public generalConditionalThird(inputName: string): boolean {
    return (
      this.formForma.get(inputName).status === 'VALID' &&
      this.formForma.get(inputName).valid
    );
  }
}
