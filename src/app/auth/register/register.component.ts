import Swal from 'sweetalert2';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/* Services */
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['../css/auth.component.css'],
})
export class RegisterComponent implements OnInit {
  /**
   * Document Object Model
   */
  private labels: HTMLCollectionBase;
  private inputs: HTMLCollectionBase;

  /**
   * Register Form Data Append
   */
  public formForma: FormGroup;

  constructor(private formBuilder: FormBuilder, private registerService: RegisterService, private router: Router) {
    this.registerFormCreate();
  }

  /**
   * HTML Builder After
   */
  ngOnInit(): void {
    Array.from((this.labels = document.querySelectorAll('.main__form label')));
    Array.from((this.inputs = document.querySelectorAll('.main__form input')));
  }

  /**
   * Event Inputs Transition Labels
   */
  public input(e): void {
    const value: string = e.target.value;
    // const attribute: string = e.target.getAttribute('type');
    const attribute: string = e.target.getAttribute('formControlName');

    switch (attribute) {
      case 'name':
        this.fieldValueTransitionLabel(value, 0, 'label__finally');
        break;

      case 'email':
        this.fieldValueTransitionLabel(value, 1, 'label__finally');
        break;

      case 'password':
        this.fieldValueTransitionLabel(value, 2, 'label__finally');
        break;

      case 'repeat_password':
        this.fieldValueTransitionLabel(value, 3, 'label__finally');
        break;
    }
  }

  /**
   * Register Form Label Transition
   */
  private fieldValueTransitionLabel(value: string, index: number, classCss: string): void {
    if (value.length) {
      this.labels[index].classList.add(classCss);
    } else {
      this.labels[index].classList.remove(classCss);
    }
  }

  /**
   * Register Form Data Builder And Validation (ANGULAR REACTIVE)
   */
  private registerFormCreate(): void {
    this.formForma = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,:\s@"]+(\.[^<>()\[\]\\.,:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
      repeat_password: ['', [Validators.required, Validators.minLength(4)]]
    }, {
      validators: this.statusFieldPasswords('password', 'repeat_password')
    });
  }

  /**
   * Los Validadores Sincronos Deben Retornar Una Function, Asi Funcionan
   * Los Passwords Se Validan A Nivel De Formulario
   * Recibimos En El Parametro Todo El Formulario
   * Hacemos La Lógica Para Validar Ambos Passwords, Antes De Enviar La Data
   */
  private statusFieldPasswords(pass1Name: string, pass2Name: string) {

    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.controls[pass1Name];
      const pass2Control = formGroup.controls[pass2Name];

      if(pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null);
      } else {
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

  /**
   * Register Form Every Field Value (ANGULAR REACTIVE)
   */
  public statusField(e): void {
    const attribute: string = e.target.getAttribute('formControlName');

    switch (attribute) {
      case 'name':
        this.validationTemplateLogicInput('name', 0, 'borderInput', 'Nombre No Válido');
        break;

      case 'email':
        this.validationTemplateLogicInput('email', 1, 'borderInput', 'Correo Eléctronico No Válido');
        break;

      case 'password':
        this.validationTemplateLogicInput('password', 2, 'borderInput', 'Contraseña No Válida');
        break;

      case 'repeat_password':
        this.validationTemplateLogicInput('repeat_password', 3, 'borderInput', 'Contraseñas No Son Iguales');
        break;
    }
  }

  /**
   * Register Form Validate Input Logic
   */
  private validationTemplateLogicInput(fieldName: string, index: number, classCss: string, message: string = ''): void {
    // tslint:disable-next-line: max-line-length
    if (this.formForma.get(fieldName).status === 'VALID' && this.formForma.get(fieldName).dirty && !this.formForma.get(fieldName).invalid && this.formForma.get(fieldName).valid) {

      if (this.labels[index].nextElementSibling || this.inputs[index].classList.contains(classCss)) {
        this.inputs[index].classList.remove(classCss);
        this.registerFormTemplateValidate(index);
      }

    } else if (!this.formForma.get(fieldName).valid && this.formForma.get(fieldName).dirty) {

      if (!this.labels[index].nextElementSibling || !this.inputs[index].classList.contains(classCss)) {
        this.inputs[index].classList.add(classCss);
        this.registerFormTemplateValidate(index, message);
      }
    }
  }

  /**
   * Register Form Data Saved And Send Server
   * Register Form All Data
   */
  public saveRegisterFormData(): void {
    // tslint:disable-next-line: max-line-length
    if (this.formForma.status === 'INVALID' || this.formForma.touched === false || this.formForma.dirty === false || this.formForma.valid === false) {
      this.completeFormValidate();
      return;
    }

    /* Response Backend */
    this.registerService.createUser(this.formForma.value)
      .subscribe(() => {
        this.router.navigateByUrl('/login');
      },error => this.showAlertError(error.error.error));
  }

  /**
   * Show Alert Errors Response Backend, If Exist!
   */
  private showAlertError(message: string): void {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: message,
    });
  }

  /**
   * Register Form Every Field Validate Controls
   */
  private completeFormValidate(): void {
    Object.values(this.formForma.controls).forEach((controlsField, index) => {

      if (controlsField.status === 'INVALID' || controlsField.valid === false) {
        this.inputs[index].classList.add('borderInput');
        this.registerFormPositionValidate(index);
      }

    });
  }

  /**
   * Register Form Position Field Validate
   */
  private registerFormPositionValidate(index: number): void {
    if (index === 0) {
      this.registerFormTemplateValidate(index, 'Nombre Obligatorio');
    } else if (index === 1) {
      this.registerFormTemplateValidate(index, 'Correo Eléctronico Obligatorio');
    } else if (index === 2) {
      this.registerFormTemplateValidate(index, 'Contraseña Obligatoria');
    } else if (index === 3) {
      this.registerFormTemplateValidate(index, 'Contraseñas No Son Iguales');
    }
  }

  /**
   * Register Form Template Builder Validate HTML
   */
  private registerFormTemplateValidate(index: number, mensajeValidate: string = ''): void {
    const small = document.createElement('small');

    if (!this.labels[index].nextElementSibling) {
      small.style.color = '#f50808';
      small.innerHTML = mensajeValidate;
      this.inputs[index].nextElementSibling.insertAdjacentElement('afterend', small);

    } else if (this.labels[index].nextElementSibling && !this.inputs[index].classList.contains('borderInput')) {
      this.labels[index].nextElementSibling.remove();
    }
  }
}