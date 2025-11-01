import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';
import { Doctor } from './find-doctors/doctor-model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly apiUrl = 'http://localhost:8082/doctor/getAllDoctors';
  private readonly defaultImage = 'assets\doctor-default.png';

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('Patienttoken'); // Replace 'authToken' with your actual key
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      delay(1000),
      retry(3),
      catchError(this.handleError)
    );
  }

  getDoctorsBySpecialization(specialization: string): Observable<Doctor[]> {
    const url = `${this.apiUrl}?specialization=${specialization}`;
    return this.http.get<Doctor[]>(url, { headers: this.getAuthHeaders() }).pipe(
      delay(800),
      retry(3),
      catchError(this.handleError)
    );
  }

  getDoctorById(id: number): Observable<Doctor> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Doctor>(url, { headers: this.getAuthHeaders() }).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }

  getDefaultImage(): string {
    return this.defaultImage;
  }
}