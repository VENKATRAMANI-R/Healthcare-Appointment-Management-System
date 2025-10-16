import { Routes } from '@angular/router';
import { BookAppointment } from './Appointment-Booking/book-appointment/book-appointment';
import { App } from './app';
import { FindDoctors } from './find-doctors/find-doctors';
import { LandingPage } from './landing-page/landing-page';
import { AboutUs } from './about-us/about-us';
import { Excellence } from './excellence/excellence';
import { Departments } from './departments/departments';
import { ContactUs } from './contact-us/contact-us';
import { RegistrationPage } from './Authentication/registration-page/registration-page';

import { E } from '@angular/cdk/keycodes';

import { PatientCare } from './patient-care/patient-care';
import { MyConsultations } from './my-consultations/my-consultations';
import { ConsultationList } from './my-consultations/consultation-list/consultation-list';
import { RegistrationPageDoctor } from './Authentication/registration-page-doctor/registration-page-doctor';
import { Login } from './Authentication/registration-page/login';
import { Logindoctor } from './Authentication/registration-page-doctor/login-doctor';
import { MyAppointments } from './Appointment-Booking/my-appointments/my-appointments';
import { DoctorAvailablityManagement } from './doctor-availablity-management/doctor-availablity-management';

export const routes: Routes = [
    {
        path:'',
        component:LandingPage
    },
    {
        path:'bookAppointment',
        component:BookAppointment
    },
    {
        path:'login',
        component: Login
    },
    {
        path:'login-doctor',
        component: Logindoctor
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
        path:'registration-page',
        component:RegistrationPage
    },
    {
        path:'my-consultations',
        component:MyConsultations
    },
    {
        path:'consultation-list',
        component:ConsultationList
    },
    {
        path: 'registration-page-doctor',
        component: RegistrationPageDoctor
    },
    {
        path:'my-appointments',
        component:MyAppointments
    },
    {
        path:'doctor-availablity-management',
        component:DoctorAvailablityManagement
    }

];
