import { Routes } from '@angular/router';
import { BookAppointment } from './book-appointment/book-appointment';
import { App } from './app';
import { LandingPage } from './landing-page/landing-page';

export const routes: Routes = [
    {
        path:'',
        component:LandingPage
    },
    {
        path:'bookAppoinment',
        component:BookAppointment
    }
];
