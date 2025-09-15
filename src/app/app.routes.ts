import { Routes } from '@angular/router';
import { BookAppointment } from './book-appointment/book-appointment';
import { App } from './app';
import { LandingPage } from './landing-page/landing-page';
import { AboutUs } from './about-us/about-us';
import { Excellence } from './excellence/excellence';

import { E } from '@angular/cdk/keycodes';
import { PatientCare } from './patient-care/patient-care';

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

    },
    {
        path: 'excellence',
        component: Excellence
    },
    {
        path:'patient-care',
        component:PatientCare
    }
];
