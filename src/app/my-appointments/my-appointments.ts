import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../appointment-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-appointments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './my-appointments.html',
  styleUrl: './my-appointments.css'
})
export class MyAppointments  {
           
  Appointment: any[]=  [
    {
      appointmentId:1,
      patientId: 'PAT12345',
      doctorId : 'DOC12345',
      doctorName: 'Dr.Guru Sakthi',
      date: '2025-10-10',
      timeSlot:'8:30 AM - 9:00 AM',
      problem: 'Fever',
      status: 'Scheduled',
  }
  ];
    
 
  constructor( private router: Router) {}
 
  rescheduleAppointment(appt: any) :void {
    const date = new Date(appt.date);
    alert(`Reschedule requested for:\nDate: ${date.toDateString()}\nTime Slot: ${appt.timeSlot}`);
    this.router.navigate(['/bookAppointment']);
  }
   
 
  cancelAppointment(appt: any) :void {
    const date = new Date(appt.date);
   const confirmCancel = confirm(`Are you sure you want to cancel the appointment on ${date.toDateString()} at ${appt.timeSlot}?`);
    if (confirmCancel) {
      appt.status = 'Cancelled';
      alert(`Appointment on ${date.toDateString()} has been cancelled`);
    }
  }
}


