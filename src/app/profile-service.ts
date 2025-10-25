import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
    private url = 'http://localhost:8080/doctor/profile/';
}
