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
  private apiUrl = 'http://localhost:8080/api/doctors'; // Spring Boot base URL
  currentSlot = 0;

  constructor(private http: HttpClient) {}

  /** ✅ Helper method to get headers once */
  private getAuthHeaders(): { headers: HttpHeaders } {
    const token = localStorage.getItem('token') || '';
    return {
      headers: new HttpHeaders().set('Authorization', `Bearer ${token}`)
    };
  }

  // Doctor Info
  getDoctor(id: number): Observable<Doctor> {
    console.log("Fetching doctor info for ID:", id);
    return this.http.get<Doctor>(`${this.apiUrl}/${id}`, this.getAuthHeaders());
  }

  // Availability
  getAvailabilitySlots(doctorId: number): Observable<AvailabilitySlot[]> {
    console.log("Getting Availability for Doctor ID:", doctorId);
    return this.http.get<AvailabilitySlot[]>(
      `${this.apiUrl}/${doctorId}/availability`,
      this.getAuthHeaders()
    );
  }

  addAvailability(newSlot: AvailabilitySlot): Observable<AvailabilitySlot> {
    console.log("Adding new slot:", newSlot);
    return this.http.post<AvailabilitySlot>(
      `${this.apiUrl}/availability`,
      newSlot,
      this.getAuthHeaders()
    );
  }

  removeAvailability(slotId: number): Observable<string> {
    console.log("Removing slot ID:", slotId);
    return this.http.delete<string>(
      `${this.apiUrl}/availability/${slotId}`,
      this.getAuthHeaders()
    );
  }

  // Appointments
  getAppointments(doctorId: number): Observable<Appointment[]> {
    console.log("Fetching appointments for Doctor ID:", doctorId);
    return this.http.get<Appointment[]>(
      `${this.apiUrl}/${doctorId}/appointments`,
      this.getAuthHeaders()
    );
  }

  updateAppointmentStatus(
    appointmentId: number,
    status: 'completed' | 'Cancel By Patient' | 'Cancel By Doctor' | 'booked'
  ): Observable<Appointment> {
    console.log("Updating appointment ID:", appointmentId, "with status:", status);
    return this.http.delete<Appointment>(
      `${this.apiUrl}/delete/appointment/${appointmentId}`,
      this.getAuthHeaders()
    );
  }
}
