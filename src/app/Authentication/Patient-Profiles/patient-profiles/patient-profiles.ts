import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProfileService } from '../../profile-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-patient-profiles',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './patient-profiles.html',
  styleUrl: './patient-profiles.css'
})
export class PatientProfiles {
   patientForm!: FormGroup;
  isProfileSaved = false;
  isEditSaved = false;
  savedPatient: any;
 
  constructor(private fb: FormBuilder, private patientService: ProfileService) {}
 
  ngOnInit(): void {
    this.patientForm = this.fb.group({
   
      dob: ['', Validators.required],
      gender: ['', Validators.required],
      bloodgroup: ['', Validators.required],
      // clinicName: [''],
      address: ['', Validators.required],
      emergencyContact: ['', Validators.required]
    });
 
    // Load profile on init
    this.patientService.getProfilePatient().subscribe({
      next: (data: any) => {
        if (data) {
          this.savedPatient = data;
          this.isProfileSaved = true;
          this.isEditSaved=false;
          // this.doctorForm.patchValue(data); // prefill form for editing
        }
      },
      error: (err) => console.error('Error fetching profile:', err)
    });
  }
 

  savePatientProfile() {
  if (this.patientForm.valid) {
    const patientData = { ...this.patientForm.value }; // No email or name in the model

    const patientEmail = localStorage.getItem('patientEmail') || '';

    this.patientService.saveProfilePatient(patientEmail, patientData).subscribe({
      next: (res) => {
        console.log('Profile saved:', res);
        this.savedPatient = res;
        this.isProfileSaved = true;
        this.isEditSaved = false;
      },
      error: (err) => console.error('Error saving profile:', err)
    });
  }
}

 
  editProfile() {
    this.isEditSaved = true;
    this.patientForm.patchValue(this.savedPatient); 
  }  
}
