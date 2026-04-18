import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private URL = 'http://localhost:3000'; 

  constructor(private http: HttpClient) { }

  login(usuario: string, password: string): Observable<any> {
    return this.http.post(`${this.URL}/login`, { usuario, password });
  }

  // Ahora estas funciones SÍ están dentro de la clase
  getPerfil(userId: number): Observable<any> {
    return this.http.get(`${this.URL}/perfil/${userId}`);
  }

  guardarPerfil(perfil: any): Observable<any> {
    return this.http.post(`${this.URL}/perfil`, perfil);
  }
}