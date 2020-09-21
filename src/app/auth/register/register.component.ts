import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) {
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
    const attribute: string = e.target.getAttribute('type');

    switch (attribute) {
      case 'text':
        if (value.length) {
          this.labels[0].classList.add('label__finally');
        } else {
          this.labels[0].classList.remove('label__finally');
        }
        break;

      case 'email':
        if (value.length) {
          this.labels[1].classList.add('label__finally');
        } else {
          this.labels[1].classList.remove('label__finally');
        }
        break;

      case 'password':
        if (value.length) {
          this.labels[2].className = 'label__finally';
        } else {
          this.labels[2].classList.remove('label__finally');
        }
        break;
    }
  }

  /**
   * Register Form Data Builder And Validation (ANGULAR REACTIVE)
   */
  public registerFormCreate(): void {
    this.formForma = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
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
   * Register Form Every Field Value (ANGULAR REACTIVE)
   */
  public statusField(e): void {
    const attribute: string = e.target.getAttribute('type');

    switch (attribute) {
      case 'text':
        if (
          this.formForma.get('name').status === 'VALID' &&
          this.formForma.get('name').dirty &&
          !this.formForma.get('name').invalid &&
          this.formForma.get('name').valid
        ) {
          if (
            this.labels[0].nextElementSibling ||
            this.inputs[0].classList.contains('borderInput')
          ) {
            this.inputs[0].classList.remove('borderInput');
            this.registerFormTemplateValidate(0);
          }
        } else if (
          !this.formForma.get('name').valid &&
          this.formForma.get('name').dirty
        ) {
          if (
            !this.labels[0].nextElementSibling ||
            !this.inputs[0].classList.contains('borderInput')
          ) {
            this.inputs[0].classList.add('borderInput');
            this.registerFormTemplateValidate(0, 'Nombre Obligatorio');
          }
        }
        break;

      case 'email':
        if (
          this.formForma.get('email').status === 'VALID' &&
          this.formForma.get('email').dirty &&
          !this.formForma.get('email').invalid &&
          this.formForma.get('email').valid
        ) {
          console.log('TODO FUNCIONA CORRECTAMENTE EMAIL');
        }
        break;

      case 'password':
        if (
          this.formForma.get('password').status === 'VALID' &&
          this.formForma.get('password').dirty &&
          !this.formForma.get('password').invalid &&
          this.formForma.get('password').valid
        ) {
          console.log('TODO FUNCIONA CORRECTAMENTE PASSWORD');
        }
        break;
    }
  }

  /**
   * Register Form Data Saved And Send Server
   * Register Form All Data
   */
  public saveRegisterFormData(): void {
    if (
      this.formForma.status === 'INVALID' ||
      this.formForma.touched === false ||
      this.formForma.dirty === false ||
      this.formForma.valid === false
    ) {
      this.completeFormValidate();
      return;
    }

    console.log('Sever Saved Data');
  }

  /**
   * Register Form Every Field Validate Controls
   */
  public completeFormValidate(): void {
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
  public registerFormPositionValidate(index: number): void {
    if (index === 0) {
      this.registerFormTemplateValidate(index, 'Nombre Obligatorio');
    } else if (index === 1) {
      this.registerFormTemplateValidate(
        index,
        'Correo Eléctronico Obligatorio'
      );
    } else if (index === 2) {
      this.registerFormTemplateValidate(index, 'Contraseña Obligatoria');
    }
  }

  /**
   * Register Form Template Validate HTML
   */
  public registerFormTemplateValidate(
    index: number,
    mensajeValidate: string = ''
  ): void {
    const small = document.createElement('small');

    if (!this.labels[index].nextElementSibling) {
      small.style.color = '#f50808';
      small.innerHTML = mensajeValidate;

      this.inputs[index].nextElementSibling.insertAdjacentElement(
        'afterend',
        small
      );
    } else if (
      this.labels[index].nextElementSibling &&
      !this.inputs[index].classList.contains('borderInput')
    ) {
      this.labels[index].nextElementSibling.remove();
    }
  }
}
