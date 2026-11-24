import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { LoginService } from '../Service/Login';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  constructor(
    private loginService: LoginService,
    private router: Router
  ) {}

  login(usuario: string, contrasena: string): void {
    const url = 'http://localhost:3000/api/v1/login';
    const body = { usuario, contrasena };
    this.loginService.post(url, body).subscribe({
      next: (data: any) => {
        if (data?.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Bienvenido',
            text: 'Inicio de sesión exitoso',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.router.navigate(['/materias']);
          });
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario o contraseña incorrectos',
          });
        }
      },
      error: () => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo conectar con el servidor',
        });
      },
    });
  }
}
