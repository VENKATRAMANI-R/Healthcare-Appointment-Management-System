import { ChangeDetectorRef, Component,OnInit} from '@angular/core';
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
export class MyAppointments implements OnInit {
      Appointment: any[] = [];

    
 
  constructor( private router: Router, private appointmentService: AppointmentService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
  
  this.appointmentService.GetAppointmentsByPatientId().subscribe(data => {
    this.Appointment = data;
    this.cdr.markForCheck();
    console.log('Appointments fetched:', this.Appointment);
  }, error => {
    console.error('Error fetching appointments:', error);
  });
  
}
 
  rescheduleAppointment(appt: any) :void {
    // const date = new Date(appt.date);
    // alert(`Reschedule requested for:\nDate: ${date.toDateString()}\nTime Slot: ${appt.timeSlot}`);
    this.router.navigate(['/bookAppointment']);
  }
   
 
  cancelAppointment(appt: any) :void {
    const date = new Date(appt.date);
    const confirmCancel = confirm(`Are you sure you want to cancel the appointment on ${date.toDateString()} at ${appt.timeSlot}?`);
    if (confirmCancel) {
      appt.status = 'Cancelled';
      this.appointmentService.cancelAppointment(appt.id).subscribe(response => {
        console.log('Appointment cancelled:', response);
      });
      alert(`Appointment on ${date.toDateString()} has been cancelled`);
    }

  }
}


