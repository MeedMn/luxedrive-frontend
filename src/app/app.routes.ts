import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AllcarsComponent } from './components/allcars/allcars.component';
import { CardetailsComponent } from './components/cardetails/cardetails.component';

export const routes: Routes = [
    {
        path: "",
        component: HomeComponent
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "register",
        component: RegisterComponent
    },
    {
        path: 'allcars',
        component: AllcarsComponent
    },
    {
        path: 'cardetails/:id',
        component: CardetailsComponent
    },
    { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },

];
