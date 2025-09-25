import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  userObj:any= {
    username : 'guru',
    password : 'Guru@1234'
  }
}
