import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AppointmentService } from '../appointment-service';

@Component({
  selector: 'app-book-appointment',
  imports: [ReactiveFormsModule],
  templateUrl: './book-appointment.html',
  styleUrl: './book-appointment.css'
})
// export class BookAppointment {

// }
export class BookAppointment implements OnInit {
  appointmentForm!: FormGroup;
  availableSlots: string[] = [];
  doctorHours: string[] = [];
   //constructor(private fb: FormBuilder) {}

  // ngOnInit(): void {
  //   this.appointmentForm = this.fb.group({
  //     userId: [{ value: 'AUTO12345', disabled: true }],
  //     userName : [{ value: 'AUTONAME', disabled: true }],
  //     appointmentDate: ['', Validators.required],
  //     timeSlot: ['', Validators.required],
  //     problem: ['', [Validators.required, Validators.maxLength(50)]],
  //   });
  // }

  // onSubmit(): void {
  //   if (this.appointmentForm.valid) {
  //     console.log('Form Data:', this.appointmentForm.getRawValue());
  //     // You can send this data to a service or backend
  //   }
  // }
  constructor(
    private fb: FormBuilder,
    //public dialogRef: MatDialogRef<BookAppointment>
    private router: Router,
    private appointmentService: AppointmentService
  ) {}

  ngOnInit(): void {
    const doctorData = history.state;
    this.availableSlots = doctorData.availability || [];
    this.doctorHours = doctorData.hours || [];

    this.appointmentForm = this.fb.group({
      patientId: [ '', Validators.required ],
      patientName: [ '', Validators.required ],
      doctorName: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],
      problem: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }
  
  //ngOnInit(): void {
   // throw new Error('Method not implemented.');
  //}


  onSubmit(): void {
    if (this.appointmentForm.valid) {
      // console.log(this.appointmentForm.getRawValue());
      const AppointmentData = this.appointmentForm.getRawValue(); 
      this.appointmentService.bookAppointment(AppointmentData).subscribe({
        next: (response) => {
          // console.log(this.appointmentForm.getRawValue());
          alert('Appointment booked successfully!');
          console.log('Appointment booked:', response);
          // this.router.navigate(['/my-appointments']);
        },
        error: (error) => {
          alert('Failed to book appointment. Please try again.');
          console.error('Error booking appointment:', error);
        }
      });
      // console.log('Appointment booked:', this.appointmentForm.getRawValue());
      //this.dialogRef.close();
    }
  }

  onClick():void{
    this.router.navigate(['/my-appointments']);
  }
      

  //onClose(): void {
   //this.dialogRef.close();
//}
}
