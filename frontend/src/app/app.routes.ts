import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login'; 
import { PerfilComponent } from './components/perfil/perfil'; 

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '**', redirectTo: '' }
];