import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule, ReactiveFormsModule,
    MatFormFieldModule, MatInputModule,
    MatButtonModule, MatCardModule, MatIconModule
  ],
  templateUrl: './register.html',
  styleUrls: ['./register.scss']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  message = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      this.message = '⚠️ Por favor completá los campos obligatorios.';
      return;
    }

    const { username, password } = this.registerForm.value;
    this.loading = true;
    this.message = '⏳ Registrando usuario...';

    this.authService.register({ username, password }).subscribe({
      next: (res) => {
        this.loading = false;
        if (res.success) {
          this.message = '✅ ' + res.message;
          setTimeout(() => this.router.navigate(['/login']), 1500);
        } else {
          this.message = '❌ ' + (res.message || 'No se pudo registrar.');
        }
      },
      error: (err) => {
        this.loading = false;

        if (err.status === 400) {
          this.message = '⚠️ ' + (err.error?.message || 'Datos inválidos.');
        } else if (err.status === 409) {
          this.message = '❌ ' + (err.error?.message || 'El usuario ya existe.');
        } else if (err.status === 500) {
          this.message = '💥 Error interno del servidor.';
        } else {
          this.message = '⚠️ Error de conexión con el servidor.';
        }
      }
    });
  }
}
