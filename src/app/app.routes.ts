import { Routes } from '@angular/router';
import { BookAppointment } from './book-appointment/book-appointment';
import { App } from './app';
import { LandingPage } from './landing-page/landing-page';
import { AboutUs } from './about-us/about-us';

export const routes: Routes = [
    {
        path:'',
        component:LandingPage
    },
    {
        path:'bookAppoinment',
        component:BookAppointment
    },
    {
        path: 'about-us', 
        component: AboutUs 

    }
];
