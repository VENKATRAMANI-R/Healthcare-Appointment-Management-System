import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService, Consultation } from '../consultation.service';
import { DoctorConsultationList } from '../doctor-consultation-list/doctor-consultation-list';

@Component({
  selector: 'app-doctor-consultations',
  standalone: true,
  imports: [CommonModule, DoctorConsultationList],
  templateUrl: './doctor-consultations.html',
  styleUrls: ['./doctor-consultations.css']
})
export class DoctorConsultations implements OnInit {
  consultations: Consultation[] = [];
  selectedConsultation: Consultation | null = null;
  showDetail = false;
  isLoading: boolean = true;
  doctorId: number = 0;
  

  constructor(
    private consultationService: ConsultationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('doctorId') ? +localStorage.getItem('doctorId')! : 0;
    this.consultationService.getConsultationsByDoctor(this.doctorId).subscribe({

    next: (data) => {
      this.consultations = data;
      this.cdr.markForCheck(); // Force view update
      console.log('Fetched consultations:', data);
      this.isLoading = false;
      this.cdr.markForCheck(); // Force view update
    },
    error: (err) => {
      console.error('Error fetching consultations:', err);
      this.isLoading = false;
      this.cdr.markForCheck();
    }
  });
}

    // Delay the API call to ensure the component is fully initialized

}




// import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { ConsultationService, Consultation } from '../consultation.service';
// import { DoctorConsultationList } from '../doctor-consultation-list/doctor-consultation-list';

// @Component({
//   selector: 'app-doctor-consultations',
//   standalone: true,
//   imports: [CommonModule, DoctorConsultationList],
//   templateUrl: './doctor-consultations.html',
//   styleUrls: ['./doctor-consultations.css']
// })
// export class DoctorConsultations implements OnInit {
//   consultations: Consultation[] = [];
//   isLoading: boolean = true;
//   doctorId: number = 201; // Hardcoded for now

//   constructor(
//     private consultationService: ConsultationService,
//     private cdr: ChangeDetectorRef
//   ) {}

//   ngOnInit(): void {
//     this.consultationService.getConsultationsByDoctor(this.doctorId).subscribe({
//       next: (data) => {
//         this.consultations = data;
//         this.isLoading = false;
//         this.cdr.detectChanges(); //  Force view update
//       },
//       error: (err) => {
//         console.error('Error fetching consultations:', err);
//         this.isLoading = false;
//         this.cdr.detectChanges(); //  Ensure view updates even on error
//       }
//     });
//   }
// }



// // import { Component, OnInit } from '@angular/core';
// // import { CommonModule } from '@angular/common';
// // import { ConsultationService, Consultation } from '../consultation.service';
// // import { DoctorConsultationList } from '../doctor-consultation-list/doctor-consultation-list';

// // @Component({
// //   selector: 'app-doctor-consultations',
// //   standalone: true,
// //   imports: [CommonModule, DoctorConsultationList],
// //   templateUrl: './doctor-consultations.html',
// //   styleUrls: ['./doctor-consultations.css']
// // })


// // export class DoctorConsultations implements OnInit {
// //   consultations: Consultation[] = [];
// //   isLoading: boolean = true;
// //   doctorId: number = 201;

// //   constructor(private consultationService: ConsultationService) {}

// //   ngOnInit(): void {
// //     this.consultationService.getConsultationsByDoctor(this.doctorId).subscribe({
// //       next: (data) => {
// //         this.consultations = data;
// //         this.isLoading = false;
// //       },
// //       error: (err) => {
// //         console.error('Error fetching consultations:', err);
// //         this.isLoading = false;
// //       }
// //     });
// //   }
// // }



// // // export class DoctorConsultations implements OnInit {

// // //   consultations: Consultation[] = [];
// // //   doctorId: number = 201; // Replace with actual doctor ID (e.g., from login/session)

// // //   constructor(private consultationService: ConsultationService) {}

// // //   // ngOnInit(): void {
// // //   //   this.consultationService.getConsultationsByDoctor(this.doctorId).subscribe({
// // //   //     next: (data) => this.consultations = data,
// // //   //     error: (err) => console.error('Error fetching consultations:', err)
// // //   //   });


// // // ngOnInit(): void {
// // //   const doctorId = 201; 
// // //   this.consultationService.getConsultationsByDoctor(doctorId).subscribe({
// // //     next: (data) => this.consultations = data,
// // //     error: (err) => console.error('Error fetching consultations:', err)
// // //   });
// // // }

// // // }
