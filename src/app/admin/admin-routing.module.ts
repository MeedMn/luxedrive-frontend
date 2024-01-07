import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminLayoutComponent } from './admin-layout/admin-layout.component';
import { EmployeeComponent } from './employee/employee.component';
import { CustomersComponent } from './customers/customers.component';
import { CarsComponent } from './cars/cars.component';
import { LoginAdminComponent } from './login-admin/login-admin.component';
import { RegisterAdminComponent } from './register-admin/register-admin.component';
import { authGuard } from '../services/auth.guard'
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { RentalsComponent } from './rentals/rentals.component';
const routes: Routes = [
  {
    path: '',
    component: AdminLayoutComponent,
    children: [
      { path: 'unauthorized', component: UnauthorizedComponent },
      { path: 'dashboard', component: AdminDashboardComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] } },
      { path: 'login', component: LoginAdminComponent },
      { path: 'register', component: RegisterAdminComponent },
      { path: 'employees', component: EmployeeComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN'] } },
      { path: 'customers', component: CustomersComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] } },
      { path: 'rentals', component: RentalsComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] } },
      { path: 'cars', component: CarsComponent, canActivate: [authGuard], data: { roles: ['ROLE_ADMIN', 'ROLE_EMPLOYEE'] } },
    ],
  },];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
