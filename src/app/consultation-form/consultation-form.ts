import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../consultation.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Appointment } from '../schedule.service';
import { Doctor } from '../doctor-landing-page/doctor-landing-page';

interface ConsultationNavigationState {
  appointment: Appointment;
  doctor: Doctor;
  date: Date;
}

@Component({
  selector: 'app-consultation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './consultation-form.html',
  styleUrls: ['./consultation-form.css']
})
export class ConsultationForm implements OnInit {
  consultationForm!: FormGroup;


  constructor(
    private consultationService: ConsultationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const nav = this.location.getState() as ConsultationNavigationState;
    console.log('Received doctor:', nav.doctor)

    this.consultationForm = new FormGroup({
      appointmentId: new FormControl(nav.appointment?.id || '', Validators.required),
      date: new FormControl(this.formatDate(nav.date), Validators.required),
      patientId: new FormControl(nav.appointment?.patientId || '', Validators.required),
      patientName: new FormControl(nav.appointment?.patientName || '', Validators.required),
      doctorId: new FormControl(nav.doctor?.doctorId || '', Validators.required),
      doctorName: new FormControl(
        `${nav.doctor?.firstName} ${nav.doctor?.lastName}` || '',
        Validators.required
      ),
      notes: new FormControl(''),
      prescriptions: new FormArray([])
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0]; // yyyy-mm-dd
  }

  get prescriptions(): FormArray {
    return this.consultationForm.get('prescriptions') as FormArray;
  }

  addPrescriptionItem(): void {
    const item = new FormGroup({
      medicineName: new FormControl('', Validators.required),
      dose: new FormControl('', Validators.required),
      frequency: new FormControl('', Validators.required),
      duration: new FormControl('', Validators.required)
    });
    this.prescriptions.push(item);
  }

  removePrescriptionItem(index: number): void {
    this.prescriptions.removeAt(index);
  }

  submitForm(): void {
    if (this.consultationForm.invalid) {
      this.consultationForm.markAllAsTouched();
      alert('Please fill all required fields.');
      return;
    }

    const formData = {
      ...this.consultationForm.value
    };

    this.consultationService.saveConsultation(formData).subscribe({
      next: (res: any) => {
        console.log('Consultation submitted:', res);

        // Update appointment status to 'Complete
        
this.consultationService.updateAppointmentStatus(formData.appointmentId, 'Completed').subscribe({
        next: () => {
          console.log('Appointment marked as completed');

          // Show success message and navigate button
          alert('Consultation submitted successfully!');
          this.router.navigate(['/doctorLandingPage']);
        },
        error: err => {
          console.error('Failed to update appointment status', err);
          alert('Consultation saved, but failed to update appointment status.');
        }
      });

        alert('Consultation submitted successfully!');
        this.consultationForm.reset();
        this.prescriptions.clear();
      },
      error: (err: any) => {
        console.error('Error submitting consultation:', err);
        alert('Failed to submit consultation.');
      }
    });
  }
}



