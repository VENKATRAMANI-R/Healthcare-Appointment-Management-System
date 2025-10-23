import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8082/doctor';
  private baseUrl1 = 'http://localhost:8082/patient';

 
  constructor(private http: HttpClient) {}
 
  // Add or update doctor profile
saveProfile(doctorEmail: string, doctorData: any): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  console.log("Sending doctor profile data:");
  console.log(doctorData);
  console.log(`${this.baseUrl}/profile/${doctorEmail}`);
  return this.http.post(`${this.baseUrl}/profile/${doctorEmail}`, doctorData, { headers });
}
 
  // Get doctor profile
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
 
    // Optional: backend could get email from token, but if not, you can send it
    const email = localStorage.getItem('doctorEmail') || '';
    return this.http.get(`${this.baseUrl}/get/${email}`, { headers });
  }

  saveProfilePatient(patientEmail: string, patientData: any): Observable<any> {
  const Patienttoken = localStorage.getItem('Patienttoken') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${Patienttoken}`);

  console.log("Sending doctor profile data:");
  console.log(patientData);
  console.log(`${this.baseUrl}/profile/${patientEmail}`);
  return this.http.post(`${this.baseUrl1}/profile/${patientEmail}`, patientData, { headers });
}
 
  // Get doctor profile
  getProfilePatient(): Observable<any> {
    const Patienttoken = localStorage.getItem('Patienttoken') || '';
    const headers = new HttpHeaders().set('Authorization',  `Bearer ${Patienttoken}`);
 
    // Optional: backend could get email from token, but if not, you can send it
    const email = localStorage.getItem('patientEmail') || '';
    return this.http.get(`${this.baseUrl1}/get/${email}`, { headers });
  }
}
