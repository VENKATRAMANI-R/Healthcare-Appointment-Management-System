import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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
  status: 'Confirmed' | 'Pending' | 'Completed' | 'cancel by doctor' | 'cancel by patient';
}

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {
  private appointmentsUrl = 'http://localhost:8080/appointments/doctor/fetch';
  
  constructor(private http: HttpClient) {}

  getTodayAppointments(doctorId: number): Observable<Appointment[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // const doctorId = localStorage.getItem('doctorId') || '';
    console.log('Fetching appointments for doctorId:', doctorId);
    console.log('url:', `${this.appointmentsUrl}/${doctorId}`); 
    return this.http.get<Appointment[]>(`${this.appointmentsUrl}/${doctorId}`, { headers });
  }
}