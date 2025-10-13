import { Component } from '@angular/core';

@Component({
  selector: 'app-patient-profiles',
  imports: [],
  templateUrl: './patient-profiles.html',
  styleUrl: './patient-profiles.css'
})
export class PatientProfiles {
   patient = {
    name: 'Suresh Kumar',
    email: 'suresh.kumar@example.com',
    phoneNumber: '9876501234',
    age: 29,
    gender: 'Male',
    bloodGroup: 'B+',
    address: '10, K.K. Nagar, Madurai',
    medicalHistory: 'Diabetic, taking regular medication'
  };
}
