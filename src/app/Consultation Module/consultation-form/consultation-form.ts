import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConsultationService } from '../consultation.service';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Appointment } from '../schedule.service';
import { Doctor } from '../../doctor-landing-page/doctor-landing-page';

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
  doctorName: string = '';
  doctorId: number = 0;

  constructor(
    private consultationService: ConsultationService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit(): void {
    const nav = this.location.getState() as ConsultationNavigationState;
    const appointmentStatus = nav.appointment?.status.toLowerCase();
    if (appointmentStatus === 'completed' || appointmentStatus === 'cancelled') {
         this.consultationForm.disable();
}

    this.doctorName = localStorage.getItem('doctorName') || '';
    this.doctorId = localStorage.getItem('doctorId') ? +localStorage.getItem('doctorId')! : 0;

    this.consultationForm = new FormGroup({
      appointmentId: new FormControl(nav.appointment?.id || '', Validators.required),
      date: new FormControl(this.formatDate(nav.date), Validators.required),
      patientId: new FormControl(nav.appointment?.patId || '', Validators.required),
      patientName: new FormControl(nav.appointment?.patientName || '', Validators.required),
      doctorId: new FormControl(this.doctorId || '', Validators.required),
      doctorName: new FormControl(`${this.doctorName}` || '', Validators.required),
      notes: new FormControl(''),
      prescriptions: new FormArray([])
    });
  }

  formatDate(date: Date): string {
    return new Date(date).toISOString().split('T')[0];
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

    const formData = { ...this.consultationForm.value };

    this.consultationService.saveConsultation(formData).subscribe({
      next: () => {
        this.consultationService.updateAppointmentStatus(formData.appointmentId).subscribe({
          next: () => {
            alert('Consultation submitted successfully!');
              this.router.navigate(['/doctorLandingPage']);
          },

        });
      },
      error: () => {
        alert('Failed to submit consultation.');
      }
    });
  }
}

