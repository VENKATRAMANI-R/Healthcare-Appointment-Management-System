import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Doctor {
  id: number;
  name: string;
  specialization: string;
  qualification: string;
  experience: number;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly apiUrl = 'http://localhost:8082/doctor/getAllDoctors'; // Change to your backend endpoint

  constructor(private http: HttpClient) {}

  // Replace this with how you get/store your token (localStorage, service, etc.)
  private getToken(): string {
    console.log('Retrieving token from localStorage');
    console.log('Token:', localStorage.getItem('Patienttoken'));
    return localStorage.getItem('Patienttoken') || '';
  }

getDoctors(): Observable<Doctor[]> {
  const token = this.getToken();
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  return this.http.get<Doctor[]>(this.apiUrl, { headers });
}

}