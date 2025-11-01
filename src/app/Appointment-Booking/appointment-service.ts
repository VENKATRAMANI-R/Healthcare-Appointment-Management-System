import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AvailabilitySlotDTO {
  id: number;
  doctorId: number;
  date: string; // Format: "YYYY-MM-DD"
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
}

export interface Appointment {
  id?: number;
  patientId: number;
  doctorId: number;
  patientName: string;
  doctorName: string;
  problem: string;
  slotId: number;
  date: string; // Format: "YYYY-MM-DD"
  startTime: string; // Format: "HH:MM"
  endTime: string; // Format: "HH:MM"
  status?: string;
}

export interface DoctorDTO {
  docId: number;
  doctorName: string;
  specialization: string;
  qualification: string;
  experience: number;
}

export interface PatientDTO {
  id: number;
  name: string;
  // Add other patient fields as needed
}

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseUrl = 'http://localhost:8083/appointments';
  private availablityUrl = 'http://localhost:8081/api/doctors' // Spring Boot base URL
  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('Patienttoken');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  // ✅ Get available slots for a doctor on a specific date
  getAvailableSlots(doctorId: number, date: string): Observable<AvailabilitySlotDTO[]> {
    return this.http.get<AvailabilitySlotDTO[]>(
      `${this.availablityUrl}/${doctorId}/${date}/availability`,
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ Book an appointment
  bookAppointment(appointmentData: Appointment): Observable<Appointment> {
    console.log("Patient Id in Service:",appointmentData.patientId); 
    console.log("Slot Id in Service:",appointmentData.slotId); 
    return this.http.post<Appointment>(
      `${this.baseUrl}/book/${appointmentData.slotId}`,
      appointmentData,
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ Get appointments by patient ID
  GetAppointmentsByPatientId(): Observable<Appointment[]> {
    const patientId = localStorage.getItem('patientId') || '';
    console.log("Patient ID:",patientId);
    const Patienttoken = localStorage.getItem('Patienttoken');// || '';
    console.log("Token:",Patienttoken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${Patienttoken}`);
    console.log("Headers:",headers);
    console.log(this.http.get(`${this.baseUrl}/${patientId}`,{ headers }));
    return this.http.get<Appointment[]>(`${this.baseUrl}/${patientId}`,{ headers });
  }

  // ✅ Update appointment status
  updateAppointmentStatus(appointmentId: number, status: 'confirmed' | 'rejected' | 'cancelled'): Observable<any> {
    return this.http.put(
      `${this.baseUrl}/${appointmentId}/status`,
      { status },
      { headers: this.getAuthHeaders() }
    );
  }

  // ✅ Cancel an appointment
  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.patch<Appointment>(
      `${this.baseUrl}/cancel/patient/${appointmentId}`,
      {},
      { headers: this.getAuthHeaders() }
    );
  }
}