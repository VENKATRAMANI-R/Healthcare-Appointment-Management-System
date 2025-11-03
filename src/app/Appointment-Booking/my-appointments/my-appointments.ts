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
  this.Appointment = data.sort((a, b) => {
    // Prioritize status: 'booked' comes before others
    if (a.status === 'booked' && b.status !== 'booked') return -1;
    if (a.status !== 'booked' && b.status === 'booked') return 1;

    // If status is the same, sort by date and time (latest first)
    const dateA = new Date(`${a.date}T${a.startTime}`);
    const dateB = new Date(`${b.date}T${b.startTime}`);
    return dateB.getTime() - dateA.getTime();
  });

  this.cdr.markForCheck();
  console.log('Appointments fetched:', this.Appointment);
}, error => {
  console.error('Error fetching appointments:', error);
});

  
}
 
  rescheduleAppointment(appt: any): void {
  const confirmReschedule = confirm(`Do you want to reschedule the appointment on ${appt.date}?`);
  if (confirmReschedule) {
    this.appointmentService.rescheduleAppointment(appt.id).subscribe({
      next: (response) => {
        appt.status = 'Rescheduled';
        this.Appointment = this.Appointment.filter(a => a.id !== appt.id);
        this.cdr.markForCheck();
        console.log('Appointment rescheduled:', response);
        alert('Appointment has been marked as rescheduled.');
        this.router.navigate(['/bookAppointment'], { state: { doctorId: appt.doctorId, doctorName: appt.doctorName } });
      },
      error: (error) => {
        console.error('Error rescheduling appointment:', error);
        alert('Failed to reschedule appointment. Please try again.');
      }
    });
  }
}

   
 
  cancelAppointment(appt: any) :void {
    const date = new Date(appt.date);
    const confirmCancel = confirm(`Are you sure you want to cancel the appointment on ${date.toDateString()} at ${appt.timeSlot}?`);
    if (confirmCancel) {
      this.appointmentService.cancelAppointment(appt.id).subscribe(response => {
        appt.status = 'Cancelled';
        this.cdr.markForCheck(); 
        console.log('Appointment cancelled:', response);
      });
      alert(`Appointment on ${date.toDateString()} has been cancelled`);
    }

  }
}


