import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, delay, retry } from 'rxjs/operators';
import { Doctor } from './find-doctors/doctor-model';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private readonly apiUrl = 'http://localhost:8080/user/doctor/getAllDoctors';
  private readonly defaultImage = 'assets/doctor-default.png'; // ✅ Fixed path

  constructor(private http: HttpClient) {}

  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('Patienttoken');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getDoctors(): Observable<Doctor[]> {
    return this.http.get<Doctor[]>(this.apiUrl, { headers: this.getAuthHeaders() }).pipe(
      delay(800),
      retry(2),
      catchError(this.handleError)
    );
  }

  getDoctorById(id: number): Observable<Doctor> {
    return this.http
      .get<Doctor>(`${this.apiUrl}/${id}`, { headers: this.getAuthHeaders() })
      .pipe(catchError(this.handleError));
  }

  getDefaultImage(): string {
    return this.defaultImage;
  }

  private handleError(error: HttpErrorResponse) {
    let message = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      message = `Error: ${error.error.message}`;
    } else {
      message = `Error ${error.status}: ${error.message}`;
    }
    console.error(message);
    return throwError(() => new Error(message));
  }
}
