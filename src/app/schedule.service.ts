import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from './doctor-landing-page/doctor-landing-page';
import { HttpClient } from '@angular/common/http';
export interface Appointment {
  id: number;
  time: string;
  patientId: number;
  patientName: string;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  reason: string;
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private doctorProfileUrl = 'http://your-api-url/api/doctors/profile';
  
  constructor(private http: HttpClient) {}

  getDoctorProfile(): Observable<Doctor> {
    return this.http.get<Doctor>(this.doctorProfileUrl);
  }
  

  private appointments: Appointment[] = [
    {
      id: 1,
      time: '09:00 AM',
      patientId: 101,
      patientName: 'John Doe',
      age: 34,
      gender: 'Male',
      reason: 'Fever and headache',
      status: 'Confirmed'
    },
    {
      id: 2,
      patientId: 102,
      time: '10:30 AM',
      patientName: 'Jane Smith',
      age: 28,
      gender: 'Female',
      reason: 'Follow-up for diabetes',
      status: 'Pending'

    },
    {
      id: 3,
      time: '11:15 AM',
      patientId: 103,
      patientName: 'Robert Brown',
      age: 45,
      gender: 'Male',
      reason: 'Chest pain',
      status: 'Confirmed'
    }
  ];

  getTodayAppointments(): Observable<Appointment[]> {
    return of(this.appointments);
  }
}