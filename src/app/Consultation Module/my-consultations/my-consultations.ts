import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { ConsultationService, Consultation } from '../consultation.service';
import { ConsultationList } from './consultation-list/consultation-list';

@Component({
  selector: 'app-my-consultations',
  standalone: true,
  imports: [CommonModule, ConsultationList, FormsModule],
  templateUrl: './my-consultations.html',
  styleUrls: ['./my-consultations.css']
})
export class MyConsultations implements OnInit {

  consultations: Consultation[] = [];
  filteredConsultations: Consultation[] = [];
  searchDoctorId: string = '';
  searchDoctorName: string = '';
  searchDate: string = '';
  selectedConsultation: Consultation | null = null;
  showDetail = false;
  isLoading: boolean = true;
  patientId: number = 0;

  constructor(
    private consultationService: ConsultationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.patientId = localStorage.getItem('patientId') ? +localStorage.getItem('patientId')! : 0;
    this.consultationService.getConsultationsByPatient(this.patientId).subscribe({
      next: (data) => {
        this.consultations = data;
        this.filteredConsultations = data;
        this.isLoading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Error fetching consultations:', err);
        this.isLoading = false;
        this.cdr.markForCheck();
      }
    });
  }

  filterConsultations() {
  this.filteredConsultations = this.consultations.filter(c => {
    const matchesId = this.searchDoctorId ? c.doctorId?.toString().includes(this.searchDoctorId) : true;
    const matchesName = this.searchDoctorName
      ? (c.doctorName ?? '').toLowerCase().includes(this.searchDoctorName.toLowerCase())
      : true;
    const matchesDate = this.searchDate ? c.date === this.searchDate : true;
    return matchesId && matchesName && matchesDate;
  });
}
}


// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ConsultationService, Consultation } from '../consultation.service';
// import { ConsultationList } from './consultation-list/consultation-list';

// @Component({
//   selector: 'app-my-consultations',
//   standalone: true,
//   imports: [CommonModule, ConsultationList],
//   templateUrl: './my-consultations.html',
//   styleUrls: ['./my-consultations.css']
// })
// export class MyConsultations implements OnInit {

//   consultations: Consultation[] = [];
//   selectedConsultation: Consultation | null = null;
//   showDetail = false;

//   constructor(private consultationService: ConsultationService) {}

  
// ngOnInit(): void {
//   this.consultationService.getConsultations().subscribe({
//     next: (data: Consultation[]) => {
//       this.consultations = data;
//     },
//     error: (err) => {
//       console.error('Error fetching consultations:', err);
//     }
//   });
// }

// }


// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { FormsModule } from '@angular/forms';
// // import { ConsultationService, Consultation } from '../consultation.service';
// // import { ConsultationList } from './consultation-list/consultation-list';
// // import { ReactiveFormsModule } from '@angular/forms'

// // @Component({
// //   selector: 'app-my-consultations',
// //   standalone: true,
// //   imports: [CommonModule,FormsModule, ConsultationList,ReactiveFormsModule],
// //   templateUrl: './my-consultations.html',
// //   styleUrls: ['./my-consultations.css']
// // })
// // export class MyConsultations implements OnInit {

// //   consultations: Consultation[] = [];
// //   filteredConsultations: Consultation[] = [];

// //   searchTerm: string = '';
// //   patientId: string = '';
// //   patientName: string = '';
// //   dob: string = '';
// //   age: number = 0;


// //   constructor(private consultationService: ConsultationService) {}

// //   calculateAge(dob: string): number {
// //   const birthDate = new Date(dob);
// //   const today = new Date();
// //   let age = today.getFullYear() - birthDate.getFullYear();
// //   const m = today.getMonth() - birthDate.getMonth();

// //   if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
// //     age--;
// //   }

// //   return age;
// // }

// //  ngOnInit(): void {
// // //   this.consultations = this.consultationService.getConsultations();
// // //   this.filteredConsultations = [...this.consultations];

// // //   const profile = this.consultationService.getPatientProfile();
// // //   if (profile) {
// // //     this.patientId = profile.patientId;
// // //     this.patientName = profile.patientName;
// // //     this.dob = profile.dob;
// // //      this.age = this.calculateAge(profile.dob);
// // //   }
// // }

  

// //   onSearch(event: Event): void {
// //   const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
// //   this.filteredConsultations = this.consultations.filter(c =>
// //     c.doctorName.toLowerCase().includes(input) ||
// //     c.date.toLowerCase().includes(input)
// //   );
// // }

// //   }
