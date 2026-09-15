import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Footer } from '../../shared/components/footer/footer';

@Component({
  selector: 'app-login',
  imports: [FormsModule, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';

  emailError: string | null = null;
  passwordError: string | null = null;
  formError: string | null = null;

  // Se activa un instante para disparar la animación de shake
  shake = false;

  // Solo mostramos errores de un campo después de que el usuario lo abandonó
  emailTouched = false;
  passwordTouched = false;

  private readonly emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  constructor(private router: Router) {}

  onEmailBlur(): void {
    this.emailTouched = true;
    this.validateEmail();
  }

  onPasswordBlur(): void {
    this.passwordTouched = true;
    this.validatePassword();
  }

  // Al escribir limpiamos el error para que no quede rojo mientras corrige
  onEmailInput(): void {
    this.emailError = null;
    this.formError = null;
  }

  onPasswordInput(): void {
    this.passwordError = null;
    this.formError = null;
  }

  private validateEmail(): boolean {
    const value = this.email.trim();

    if (!value) {
      this.emailError = 'Ingresá tu email';
    } else if (!this.emailPattern.test(value)) {
      this.emailError = 'El email no es válido';
    } else {
      this.emailError = null;
    }

    return this.emailError === null;
  }

  private validatePassword(): boolean {
    if (!this.password) {
      this.passwordError = 'Ingresá tu contraseña';
    } else if (this.password.length < 6) {
      this.passwordError = 'Debe tener al menos 6 caracteres';
    } else {
      this.passwordError = null;
    }

    return this.passwordError === null;
  }

  onSubmit(): void {
    this.emailTouched = true;
    this.passwordTouched = true;
    this.formError = null;

    const emailOk = this.validateEmail();
    const passwordOk = this.validatePassword();

    if (!emailOk || !passwordOk) {
      this.triggerShake();
      return;
    }

    this.router.navigate(['/home']);
  }

  private triggerShake(): void {
    this.shake = false;
    setTimeout(() => (this.shake = true), 0);
    setTimeout(() => (this.shake = false), 450);
  }
}