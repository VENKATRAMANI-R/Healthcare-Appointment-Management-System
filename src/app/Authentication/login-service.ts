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

  private url = 'http://localhost:8080/authentication/login';

  // private url1 = 'http://localhost:8086/login';

  constructor(private http: HttpClient) { }
  login(email: string, password: string) {
    const body = { email, password };
    console.log(body);
    console.log(this.http.post(`${this.url}`, body));
    return this.http.post(`${this.url}`, body);
  }

  loginPatient(email: string, password: string) {
    const body = { email, password };
    return this.http.post(`${this.url}`, body );
  }
  }


