import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService {
  Appointment:any= {
    userId: 'PAT12345',
      name:'Guru Sakthi',
      date: '2025-10-10',
      timeSlot:'8:30 AM - 9:00 AM',
      problem: 'Fever',
      status: 'Scheduled',
}
  date: any;
  timeSlot: any;
  status: string | undefined;
}
