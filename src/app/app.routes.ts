import { Routes } from '@angular/router';
import { BookAppointment } from './book-appointment/book-appointment';
import { App } from './app';
import { FindDoctors } from './find-doctors/find-doctors';
import { LandingPage } from './landing-page/landing-page';
import { AboutUs } from './about-us/about-us';
import { Excellence } from './excellence/excellence';
import { Departments } from './departments/departments';
import { ContactUs } from './contact-us/contact-us';
import { E } from '@angular/cdk/keycodes';
import { PatientCare } from './patient-care/patient-care';
import { MyConsultations } from './my-consultations/my-consultations';
import { ConsultationList } from './my-consultations/consultation-list/consultation-list';

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
        path: 'FindDoctors',
        component: FindDoctors
    },
    {
        path: 'departments',
        component: Departments
    },
    {
        path: 'contact-us',
        component: ContactUs
    },
    {
    
        path: 'excellence',
        component: Excellence
    },
    {
        path:'patient-care',
        component:PatientCare
    },
    {
        path:'my-consultations',
        component:MyConsultations
    },
    {
        path:'consultation-list',
        component:ConsultationList
    }

];
