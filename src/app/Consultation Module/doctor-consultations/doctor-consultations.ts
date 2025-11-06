import { FormsModule } from '@angular/forms'; 
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService, Consultation } from '../consultation.service';
import { DoctorConsultationList } from '../doctor-consultation-list/doctor-consultation-list';
@Component({
  selector: 'app-doctor-consultations',
  standalone: true,
  imports: [CommonModule, DoctorConsultationList, FormsModule],
  templateUrl: './doctor-consultations.html',
  styleUrls: ['./doctor-consultations.css']
})
export class DoctorConsultations implements OnInit {
  consultations: Consultation[] = [];
  filteredConsultations: Consultation[] = [];
  searchPatientId: string = '';
  searchPatientName: string = '';
  searchDate: string = '';
  isLoading: boolean = true;
  doctorId: number = 0;

  constructor(private consultationService: ConsultationService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.doctorId = localStorage.getItem('doctorId') ? +localStorage.getItem('doctorId')! : 0;
    this.consultationService.getConsultationsByDoctor(this.doctorId).subscribe({
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
    const matchesId = this.searchPatientId ? c.patientId?.toString().includes(this.searchPatientId) : true;
    const matchesName = this.searchPatientName
      ? (c.patientName ?? '').toLowerCase().includes(this.searchPatientName.toLowerCase())
      : true;
    const matchesDate = this.searchDate ? c.date === this.searchDate : true;
    return matchesId && matchesName && matchesDate;
  });
}

  clearFilters() {
    this.searchPatientId = '';
    this.searchPatientName = '';
    this.searchDate = '';
    this.filteredConsultations = this.consultations;
  }

}
