import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { RegisterComponent } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { UsersComponent } from './pages/users/users';
import { ProductsComponent } from './pages/products/products';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized';
import { AdminLayoutComponent } from './layout/admin-layout/admin-layout';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  {path:'', component:AdminLayoutComponent, 
    children:[
      { path: 'dashboard', 
        component: DashboardComponent, 
        canActivate: [authGuard] 
      },
      { 
        path: 'users', 
        component: UsersComponent, 
        canActivate: [authGuard, RoleGuard], 
        data: { roles: ['Admin'] } 
      },

      { 
        path: 'products', 
        component: ProductsComponent, 
        canActivate: [authGuard, RoleGuard], 
        data: { roles: ['Admin', 'User'] } 
      }

    ]
  },

  // Página para accesos no autorizados
  { path: 'unauthorized', component: UnauthorizedComponent },

  // Fallback (por si ingresan una ruta inexistente)
  { path: '**', redirectTo: '/login' }
];


