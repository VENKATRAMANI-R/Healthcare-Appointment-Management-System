import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvailabilitySlot {
  id?: number;
  date: string;
  startTime: string;
  endTime: string;
}

export interface Appointment {
  id: number;
  patientName: string;
  date: string;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
}

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8080/api/doctors'; // Spring Boot base URL
  currentSlot=0;
  constructor(private http: HttpClient) {}

  // Doctor Info
  getDoctor(id: number): Observable<Doctor> {
    // console.log("I tried")
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`);
  }

  // Availability
  getAvailabilitySlots(doctorId: number): Observable<AvailabilitySlot[]> {
    return this.http.get<AvailabilitySlot[]>(`${this.apiUrl}/${doctorId}/availablity`);
  }

  addAvailability(doctorId: number, newSlot: AvailabilitySlot): Observable<AvailabilitySlot> {
    return this.http.post<AvailabilitySlot>(`${this.apiUrl}/${doctorId}/availablity`, newSlot);
  }

removeAvailability(slotId: number): Observable<void> {
 
  return this.http.delete<void>(`${this.apiUrl}/availablity/${slotId}`);
}

  // Appointments
  getAppointments(doctorId: number): Observable<Appointment[]> {
    return this.http.get<Appointment[]>(`${this.apiUrl}/${doctorId}/appointment`);
  }

  updateAppointmentStatus(appointmentId: number, status: 'confirmed' | 'rejected' | 'cancelled'): Observable<Appointment> {
    return this.http.put<Appointment>(
      `${this.apiUrl}/appointments/${appointmentId}/status?status=${status.toUpperCase()}`,
      {}
    );
  }
}
 