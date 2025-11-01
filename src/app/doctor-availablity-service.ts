import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvailabilitySlot {
  slotid?: number;
  date: string;
  startTime: string;
  endTime: string;
  doctorId: number;
}

export interface Appointment {
  id: number;
  patientName: string;
  slotId: number;
  date: string;
  startTime: string;
  endTime: string;
  status: 'booked' | 'Cancel By Patient' | 'Cancel By Doctor' | 'Completed';
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorAvailablityService {
  private apiUrl = 'http://localhost:8081/api/doctors'; // Spring Boot base URL
  currentSlot=0;
  constructor(private http: HttpClient) {}
  

  // Doctor Info
  getDoctor(id: number): Observable<Doctor> {
    // console.log("I tried")
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("I tried"+id)
    console.log(this.http.get<Doctor>(`${this.apiUrl}/${id}`,{ headers }));
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`,{ headers });
  }

  // Availability
  getAvailabilitySlots(doctorId: number): Observable<AvailabilitySlot[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<AvailabilitySlot[]>(`${this.apiUrl}/${doctorId}/availability`,{ headers });
  }

  addAvailability(newSlot: AvailabilitySlot): Observable<AvailabilitySlot> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<AvailabilitySlot>(`${this.apiUrl}/availability`, newSlot,{ headers });
  }

removeAvailability(slotId: number): Observable<string> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
  return this.http.delete<string>(`${this.apiUrl}/availablity/${slotId}`,{ headers });
}

  // Appointments
  getAppointments(doctorId: number): Observable<Appointment[]> {
     const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Appointment[]>(`${this.apiUrl}/${doctorId}/appointments`,{headers});
  }

  updateAppointmentStatus(appointmentId: number, status: 'completed' | 'Cancel By Patient' | 'Cancel By Doctor'|'booked'): Observable<Appointment> {
    return this.http.delete<Appointment>(
      `${this.apiUrl}/delete/appointment/${appointmentId}`,
      {}
    );
  }
}
 