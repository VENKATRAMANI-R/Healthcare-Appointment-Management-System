import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PrescriptionItem {
  medicineName: string;
  dose: string;
  frequency: string;
  duration?: string;
  notes?: string;
}

export interface Consultation {
  id?: number;
  appointmentId?: number;
  patientId: number;
  patientName: string;
  doctorId: number;
  doctorName: string;
  date: string;
  notes?: string;
  prescriptions?: PrescriptionItem[];
  createdAt?: String;
  // updatedAt?: string;
  // attachments?: { filename: string; size: number; mimeType: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {

  // private baseUrl = 'http://localhost:8080/consultations';

  private baseUrl = 'http://localhost:8080/api/consultations';

constructor(private http: HttpClient) {}
userId: number = localStorage.getItem('userId') ? +localStorage.getItem('userId')! : 0;

// Get consultations for the logged-in patient
getConsultations(): Observable<Consultation[]> {
  console.log('Fetching consultations for patient ID:', this.userId);
  return this.http.get<Consultation[]>(`${this.baseUrl}/patient/${this.userId}`);
}


  // Save a new consultation
  saveConsultation(consultation: Consultation[]): Observable<Consultation[]> {
    console.log('Saving consultation:', consultation);
    return this.http.post<Consultation[]>(this.baseUrl, consultation);
  }

  
updateAppointmentStatus(appointmentId: number): Observable<any> {
  return this.http.post(`http://localhost:8080/appointments/doctor/completed/${appointmentId}`,{});
}


  // Get a consultation by ID
  getConsultationById(id: string): Observable<Consultation> {
    return this.http.get<Consultation>(`${this.baseUrl}/${id}`);
  }

  getConsultationsByDoctor(doctorId: number): Observable<Consultation[]> {
    console.log('Fetching consultations for doctor ID:', doctorId);
  return this.http.get<Consultation[]>(`${this.baseUrl}/doctor/${doctorId}`);
  }
  getConsultationsByPatient(patientId: number): Observable<Consultation[]> {
  return this.http.get<Consultation[]>(`${this.baseUrl}/patient/${patientId}`);
}
}