import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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

  // constructor(private fb: FormBuilder) {}

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
    public dialogRef: MatDialogRef<BookAppointment>
  ) {
    this.appointmentForm = this.fb.group({
      userId: [{ value: 'PAT12345', disabled: true }],
      userName: [{ value: 'John Doe', disabled: true }],
      appointmentDate: ['', Validators.required],
      timeSlot: ['', Validators.required],
      problem: ['', [Validators.required, Validators.maxLength(50)]]
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  onSubmit(): void {
    if (this.appointmentForm.valid) {
      console.log('Appointment booked:', this.appointmentForm.getRawValue());
      this.dialogRef.close();
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
