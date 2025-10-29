import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserNotification } from './UserNotification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = "http://localhost:8085/notification/patient/101";

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<UserNotification[]> {
    return this.http.get<UserNotification[]>(this.apiUrl);
  }
}
