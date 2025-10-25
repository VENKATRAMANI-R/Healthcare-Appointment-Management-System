import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {


//   userObj:any= {
//     username : 'amarsri',
//     password : 'Amarsri@16092003'
//   }
// login(username: string, password: string): boolean {
//     if (username === this.userObj.username && password === this.userObj.password) {
//       localStorage.setItem('doctorEmail', username); 
//       return true; 
//     } else {
//       return false; 
//     }

  private url = 'http://localhost:8082/doctor';

  private url1 = 'http://localhost:8082/patient';

  constructor(private http: HttpClient) { }
  login(doctorEmail: string, doctorPassword: string) {
    const body = { doctorEmail, doctorPassword };
    return this.http.post(`${this.url}/login`, body );
  }

  loginPatient(patientEmail: string, patientPassword: string) {
    const body = { patientEmail, patientPassword };
    return this.http.post(`${this.url1}/login`, body );
  }
  }


