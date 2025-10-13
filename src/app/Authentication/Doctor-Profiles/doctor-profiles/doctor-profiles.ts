// import { CommonModule } from '@angular/common';
// import { HttpClient } from '@angular/common/http';
// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

// @Component({
//   selector: 'app-doctor-profiles',
//   imports: [ReactiveFormsModule, CommonModule],
//   templateUrl: './doctor-profiles.html',
//   styleUrl: './doctor-profiles.css'
// })
// export class DoctorProfiles implements OnInit {
//    doctorForm!: FormGroup;
//   isProfileSaved = false; // control view toggle
//   savedDoctor: any;       // store saved data
 
//   constructor(private fb: FormBuilder, private http: HttpClient) {}
 
//   ngOnInit(): void {
//     this.doctorForm = this.fb.group({
//       specialization: ['', Validators.required],
//       qualification: ['', Validators.required],
//       experience: ['', Validators.required],
//       address: ['', Validators.required],
//       about: ['']
//     });
// if (typeof window !== 'undefined' && window.localStorage){
//   const email = localStorage.getItem('doctorEmail') || '';
//   this.http.get(`http://localhost:8080/doctor/get/${email}`).subscribe({
//     next:(data:any) => {
//     if(data) {
//       this.savedDoctor = data;
//       this.isProfileSaved = true;
//       // this.doctorForm.patchValue(this.savedDoctor); // prefill form for editing
//     }
//   },
//     error: (err:any) => {
//       console.error('Error fetching doctor profile:', err);
//     }
//   });
// }
 
//      saveDoctorProfile() {
//     if (this.doctorForm.valid) {
//       this.savedDoctor = this.doctorForm.value;
//       const email = localStorage.getItem('doctorEmail') || '';
//       const doctorData = { ...this.doctorForm.value, email };
//       // console.log(email);
//       this.http.post(`http://localhost:8080/doctor/profile/get/${email}`, doctorData).subscribe({
//         next:(res:any) => {
//           this.savedDoctor = res; 
//           console.log('Doctor profile saved successfully:', res);
//           this.isProfileSaved = true;  // switch to profile view
//     },
//     error:(err:any) => {
//           console.error('Error saving doctor profile:', err);
//         }
//     });
//     }
//     // this.isProfileSaved = true;
//   }
//   editProfile() {
//     this.isProfileSaved = false;
//     this.doctorForm.patchValue(this.savedDoctor); // refill form for editing
//   }
// }}





import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { response } from 'express';

@Component({
  selector: 'app-doctor-profiles',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './doctor-profiles.html',
  styleUrls: ['./doctor-profiles.css']
})
export class DoctorProfiles implements OnInit {
  doctorForm!: FormGroup;
  isProfileSaved = false;
  savedDoctor: any;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.doctorForm = this.fb.group({
      specialization: ['', Validators.required],
      qualification: ['', Validators.required],
      experience: ['', Validators.required],
      address: ['', Validators.required],
      about: ['']
    });

    // ✅ Check if localStorage is available
    if (typeof window !== 'undefined' && window.localStorage) {
      const email = localStorage.getItem('doctorEmail') || '';
      if (email) {
        this.http.get(`http://localhost:8080/doctor/get/${email}`,).subscribe({
          next: (data: any) => {
            if (data) {
              this.savedDoctor = data;
              this.isProfileSaved = true;
              
              // this.doctorForm.patchValue(this.savedDoctor);
            }
          },
          error: (err: any) => {
            console.error('Error fetching doctor profile:', err);
          }
        });
      }
    }
  }

  saveDoctorProfile() {
    if (this.doctorForm.valid) {
      const email = localStorage.getItem('doctorEmail') || '';
      const doctorData = { ...this.doctorForm.value, email };

      this.http.post(`http://localhost:8080/doctor/profile/${email}`, doctorData).subscribe({
        next: (res: any) => {
          this.savedDoctor = res;
          console.log('Doctor profile saved successfully:', res);
          this.isProfileSaved = true;
        },
        error: (err: any) => {
          console.error('Error saving doctor profile:', err);
        }
      });
    }
  }

  editProfile() {
    this.isProfileSaved = false;
    this.doctorForm.patchValue(this.savedDoctor);
  }
}