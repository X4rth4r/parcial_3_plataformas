import { Routes } from '@angular/router';
import { materias } from '../materias/materias';
import { Login } from '../login/login';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login },
    { path: 'materias', component: materias },
    { path: 'formulario', component: materias },
];