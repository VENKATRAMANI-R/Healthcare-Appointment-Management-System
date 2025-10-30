import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:8082/doctor';
  private baseUrl1 = 'http://localhost:8082/patient';

 
  constructor(private http: HttpClient) {
    if(!this.isBrowser()) return;
  }
 
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
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
    // Optional: backend could get email from token, but if not, you can send it
    const email = localStorage.getItem('doctorEmail') || '';
    console.log("Fetching patient profile for email:", email);  
    return this.http.get(`${this.baseUrl}/get/${email}`, { headers });
  }

  //Save patient profile
  saveProfilePatient(patientEmail: string, patientData: any): Observable<any> {
  const Patienttoken = localStorage.getItem('Patienttoken')// || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${Patienttoken}`);

  console.log("Sending Patient profile data:");
  console.log(patientData);
  console.log(`${this.baseUrl}/profile/${patientEmail}`);
  return this.http.post(`${this.baseUrl1}/profile/${patientEmail}`, patientData, { headers });
}
 
  // Get patient profile
  getProfilePatient(): Observable<any> {
    const Patienttoken = localStorage.getItem('Patienttoken') ;//|| '';
    const headers = new HttpHeaders().set('Authorization',  `Bearer ${Patienttoken}`);
    
    const email = localStorage.getItem('patientEmail') //|| '';
    console.log("Fetching patient profile for email:", email);  
    return this.http.get(`${this.baseUrl1}/get/${email}`, { headers });
  }
   isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
