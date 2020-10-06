import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Services */
import { LoginService } from '../services/login.service';

/* Constante De Google */
declare const gapi: any;

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
  
  /**
   * Variable De Google
   */
  private auth2: any;

  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private router: Router) {
    this.loginFormDataBuild();
    /* Inicia La Authenticación De Google */
    this.startApp();
  }

  ngOnInit(): void {
    Array.from((this.inputs = document.querySelectorAll('.main__form input')));
    Array.from((this.labels = document.querySelectorAll('.main__form label')));
    this.emailPositionInitialRemember();
  }
  
  /**
   * Input Field Email Position Inital Remember
   */
  private emailPositionInitialRemember(): void {
    if(this.formForma.get('email').value) {
      this.fieldValueTransitionLabel(this.formForma.get('email').value, 0, 'label__finally');
    }
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
  private fieldValueTransitionLabel(value: string, index: number, classCss: string): void {
    if (value.length) {
      this.labels[index].classList.add(classCss);
    } else {
      this.labels[index].classList.remove(classCss);
    }
  }

  /**
   * Login Form Data Build (ANGULAR)
   */
  private loginFormDataBuild(): void {
    this.formForma = this.formBuilder.group({
      email: [localStorage.getItem('email') || '', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      remember: [false]
    });
  }

  /**
   * Login Form Get Data And Send To Server
   */
  public loginFormDataSaved(): void {
    // tslint:disable-next-line: max-line-length
    if (this.formForma.status === 'INVALID' || this.formForma.dirty === false || this.formForma.valid === false) { 
      Object.values(this.formForma.controls).forEach((controlsField, index) => {

        if (controlsField.status === 'INVALID' || controlsField.valid === false) {
          this.inputs[index].classList.add('borderInput');
          this.validateTwo = this.generalConditional('email');
          this.validateFour = this.generalConditional('password');
        }

      });

      return;
    }

    /* Response Backend */
    this.loginService.login(this.formForma.value)
      .subscribe( () =>  {
        this.savedRememberLocalStorage();
        this.router.navigateByUrl('/dashboard');
        }, error => this.showAlertError(error.error.error));
  }

  /**
   * Guardar Email En El LocalStorage Si El Usuario Lo Desea
   */
  private savedRememberLocalStorage(): void {
    if(this.formForma.get('remember').value) {
      localStorage.setItem('email', this.formForma.get('email').value);
    } else {
      localStorage.removeItem('email');
    }
  }

  /**
   * Mostrar Mensaje De Error Si Existe En La Respuesta Del Backend
   */
  private showAlertError(message: string): void {
    Swal.fire({ icon: 'error', title: 'Oops...', text: message });
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
  private generalConditional(inputName: string): boolean {
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
  private generalConditionalSecond(inputName: string): boolean {
    return (
      this.formForma.get(inputName).status === 'INVALID' &&
      this.formForma.get(inputName).dirty &&
      !this.formForma.get(inputName).valid
    );
  }

  /**
   * Big And General Conditional Third (VALIDATION INPUT)
   */
  private generalConditionalThird(inputName: string): boolean {
    return (
      this.formForma.get(inputName).status === 'VALID' &&
      this.formForma.get(inputName).valid
    );
  }

  /**
   * Frontend Google Sign In Logic (Boton Personalizado)
   * Los Array Function LOs Implemento Para Que No Cambien El This De Las Funciones
   */
  private startApp(): void {
    gapi.load('auth2', () => {

      this.auth2 = gapi.auth2.init({
        client_id: '24949782543-ks08iocf3mi3tko0gn8ilpgspmb5rtcg.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
      });

      this.attachSignin(document.getElementById('googleBtn'));
    });
  };

  private attachSignin(element) {

    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      const { id_token } = googleUser.getAuthResponse();

      this.loginService.loginGoogle(id_token).subscribe(
        () => this.router.navigateByUrl('/dashboard')
      );

    }, (error) => {
      alert(JSON.stringify(error, undefined, 2));
    });
  }
}
