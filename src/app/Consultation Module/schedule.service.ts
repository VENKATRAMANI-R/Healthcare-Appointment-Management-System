import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Doctor } from '../doctor-landing-page/doctor-landing-page';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export interface Appointment {
  id: number;
  startTime: string;
  endTime : string;
  patId: number;
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
  // private doctorProfileUrl = 'http://your-api-url/api/doctors/profile';
  private appointmentsUrl = 'http://localhost:8080/appointments/doctor/fetch';
  
  constructor(private http: HttpClient) {}

  // getDoctorProfile(): Observable<Doctor> {
  //   return this.http.get<Doctor>(this.doctorProfileUrl);
  // }
  

  // private appointments: Appointment[] = [
  //   {
  //     id: 1,
  //     time: '09:00 AM',
  //     patientId: 101,
  //     patientName: 'John Doe',
  //     age: 34,
  //     gender: 'Male',
  //     reason: 'Fever and headache',
  //     status: 'Confirmed'
  //   },
  //   {
  //     id: 2,
  //     patientId: 102,
  //     time: '10:30 AM',
  //     patientName: 'Jane Smith',
  //     age: 28,
  //     gender: 'Female',
  //     reason: 'Follow-up for diabetes',
  //     status: 'Pending'

  //   },
  //   {
  //     id: 3,
  //     time: '11:15 AM',
  //     patientId: 103,
  //     patientName: 'Robert Brown',
  //     age: 45,
  //     gender: 'Male',
  //     reason: 'Chest pain',
  //     status: 'Confirmed'
  //   }
  // ];

  // getTodayAppointments(): Observable<Appointment[]> {
  //   return of(this.appointments);
  // }


  getTodayAppointments(doctorId: number): Observable<Appointment[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // const doctorId = localStorage.getItem('doctorId') || '';
    console.log('Fetching appointments for doctorId:', doctorId);
    console.log('url:', `${this.appointmentsUrl}/${doctorId}`); 
    return this.http.get<Appointment[]>(`${this.appointmentsUrl}/${doctorId}`, { headers });
  }
}