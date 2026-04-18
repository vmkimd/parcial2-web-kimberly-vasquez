import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.html', // <--- Asegúrate que diga solo login.html
  styleUrl: './login.css'      // <--- Asegúrate que diga solo login.css
})
export class LoginComponent {
  usuario = '';
  password = '';
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (!this.usuario || !this.password) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.authService.login(this.usuario, this.password).subscribe({
      next: (res) => {
        alert('¡Bienvenida!');
        this.router.navigate(['/perfil']);
      },
      error: (err) => {
        this.errorMessage = 'Credenciales incorrectas';
      }
    });
  }
}