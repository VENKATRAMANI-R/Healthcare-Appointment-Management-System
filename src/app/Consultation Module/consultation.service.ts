import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
}

@Injectable({
  providedIn: 'root'
})
export class ConsultationService {


  private baseUrl = 'http://localhost:8080/api/consultations';

constructor(private http: HttpClient) {}
userId: number = localStorage.getItem('userId') ? +localStorage.getItem('userId')! : 0;


// Get consultations for the logged-in patient
getConsultations(): Observable<Consultation[]> {
  console.log('Fetching consultations for patient ID:', this.userId);
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Consultation[]>(`${this.baseUrl}/patient/${this.userId}`,{ headers } );
}


  // Save a new consultation
  saveConsultation(consultation: Consultation[]): Observable<Consultation[]> {
    console.log('Saving consultation:', consultation);
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Consultation[]>(this.baseUrl, consultation,{ headers });
  }

  
updateAppointmentStatus(appointmentId: number): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.post(`http://localhost:8080/appointments/doctor/completed/${appointmentId}`,{},{ headers } );
}


  // Get a consultation by ID
  getConsultationById(id: string): Observable<Consultation> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Consultation>(`${this.baseUrl}/${id}`,{ headers });
  }

  getConsultationsByDoctor(doctorId: number): Observable<Consultation[]> {
    console.log('Fetching consultations for doctor ID:', doctorId);
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Consultation[]>(`${this.baseUrl}/doctor/${doctorId}`,{ headers } );
  }
  getConsultationsByPatient(patientId: number): Observable<Consultation[]> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Consultation[]>(`${this.baseUrl}/patient/${patientId}`,{ headers } );
}
}