import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNotification } from './UserNotification';


@Injectable({
  providedIn: 'root'
})
export class NotificationServiceDoctor {
  private apiUrl = "http://localhost:8085/notification/doctor";

  constructor(private http: HttpClient) {}
  

  getNotifications(doctorId:number): Observable<UserNotification[]> {
    return this.http.get<UserNotification[]>(`${this.apiUrl}/${doctorId}`);
  }
}
