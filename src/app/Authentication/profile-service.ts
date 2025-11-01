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
saveProfile(doctorId: number, doctorData: any): Observable<any> {
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  console.log("Sending doctor profile data:");
  console.log(doctorData);
  console.log(`${this.baseUrl}/profile/${doctorId}`);
  return this.http.post(`${this.baseUrl}/profile/${doctorId}`, doctorData, { headers });
}
 
  // Get doctor profile
  getProfile(): Observable<any> {
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
 
    // Optional: backend could get email from token, but if not, you can send it
    const id = localStorage.getItem('doctorId') || '';
    console.log("Fetching patient profile for email:", id);  
    return this.http.get(`${this.baseUrl}/get/${id}`, { headers });
  }

  //Save patient profile
  saveProfilePatient(patientId: number, patientData: any): Observable<any> {
  const Patienttoken = localStorage.getItem('Patienttoken')// || '';
  const headers = new HttpHeaders().set('Authorization', `Bearer ${Patienttoken}`);

  console.log("Sending Patient profile data:");
  console.log(patientData);
  console.log(`${this.baseUrl}/profile/${patientId}`);
  return this.http.post(`${this.baseUrl1}/profile/${patientId}`, patientData, { headers });
}
 
  // Get patient profile
  getProfilePatient(): Observable<any> {
    const Patienttoken = localStorage.getItem('Patienttoken') ;//|| '';
    const headers = new HttpHeaders().set('Authorization',  `Bearer ${Patienttoken}`);
    
    const id = localStorage.getItem('patientId') //|| '';
    console.log("Fetching patient profile for email:", id);  
    return this.http.get(`${this.baseUrl1}/get/${id}`, { headers });
  }
   isBrowser(): boolean {
    return typeof window !== 'undefined';
  }
}
