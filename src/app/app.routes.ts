import { Routes } from '@angular/router';
import { SignIn } from './pages/sign-in/sign-in';
import { SignUp } from './pages/sign-up/sign-up';
import { Layout } from './pages/layout/layout';

export const routes: Routes = [
    { path: 'home', component: Layout},
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'login', component: SignIn },
    { path: 'register', component: SignUp },
    { path: 'resources', loadComponent: () => import('./pages/resources/resources').then(m => m.Resources) },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];
