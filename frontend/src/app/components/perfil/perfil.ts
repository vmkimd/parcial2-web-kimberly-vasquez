import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './perfil.html'
})
export class PerfilComponent implements OnInit {
  perfil: any = {
    nombre: '',
    apellido: '',
    edad: 0,
    correo: '',
    telefono: '',
    usuario_id: 1 
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Al cargar el componente, recuperamos los datos actuales de la DB
    this.authService.getPerfil(1).subscribe({
      next: (res) => {
        if (res && res.nombre) {
          this.perfil = res;
        }
      }
    });
  }

  guardar() {
    // 1. Validación de campos obligatorios
    if (!this.perfil.nombre || !this.perfil.apellido || !this.perfil.correo || !this.perfil.telefono) {
      alert('Todos los campos son obligatorios');
      return;
    }

    // 2. Validación de Formato de Correo (Requisito del Parcial)
    const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
    if (!emailPattern.test(this.perfil.correo)) {
      alert('Por favor, ingrese un correo electrónico válido (ejemplo@correo.com)');
      return;
    }

    // 3. Validación de Teléfono (Exactamente 8 dígitos)
    if (this.perfil.telefono.toString().length !== 8) {
      alert('El teléfono debe tener exactamente 8 dígitos');
      return;
    }

    // 4. Envío de datos al Backend si todo es válido
    this.authService.guardarPerfil(this.perfil).subscribe({
      next: (res) => {
        alert(res.message); // Muestra si se guardó por primera vez o si se actualizó
      },
      error: (err) => {
        alert('Error al procesar los datos en el servidor');
      }
    });
  }
}