import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RegistrationpageService {
  private url = "http://localhost:8080/doctor/register";

  private url1 = "http://localhost:8080/patient/register";
    
  constructor(private http : HttpClient) {}

    registerDoctor(user: any): Observable<any> {
        return this.http.post(this.url, user);
    }

    registerUser(user: any): Observable<any> {
        return this.http.post(this.url1, user);
    }
}
