import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  private baseurl = 'http://localhost:8083/appointments'; // Spring Boot base URL

  constructor(private http: HttpClient) {  }
//   Appointment:any= {
//     userId: 'PAT12345',
//       name:'Guru Sakthi',
//       date: '2025-10-10',
//       timeSlot:'8:30 AM - 9:00 AM',
//       problem: 'Fever',
//       status: 'Scheduled',
// }
//   date: any;
//   timeSlot: any;
//   status: string | undefined;

  bookAppointment(appointmentData: any): Observable<any> {
    
    const Patienttoken = localStorage.getItem('Patienttoken');// || '';
    console.log("Token:",Patienttoken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${Patienttoken}`);
    return this.http.post(`${this.baseurl}/book/7`, appointmentData, { headers });
  }

  GetAppointmentsByPatientId(): Observable<any> {
    const patientId = localStorage.getItem('patientId') || '';
    console.log("Patient ID:",patientId);
    const Patienttoken = localStorage.getItem('Patienttoken');// || '';
    console.log("Token:",Patienttoken);
    const headers = new HttpHeaders().set('Authorization', `Bearer ${Patienttoken}`);
    return this.http.get(`${this.baseurl}/${patientId}`,{ headers });
  }

  updateAppointmentStatus(appointmentId: number, status: 'confirmed' | 'rejected' | 'cancelled'): Observable<any> {
    return this.http.put(`${this.baseurl}/${appointmentId}/status`, { status });
}

  cancelAppointment(appointmentId: number): Observable<any> {
    return this.http.put(`${this.baseurl}/${appointmentId}/cancel`, {});
  }
}
