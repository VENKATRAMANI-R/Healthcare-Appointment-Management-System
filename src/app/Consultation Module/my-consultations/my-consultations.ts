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

