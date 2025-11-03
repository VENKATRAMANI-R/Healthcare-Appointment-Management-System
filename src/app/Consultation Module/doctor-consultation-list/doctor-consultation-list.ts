import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Consultation } from '../consultation.service';

@Component({
  selector: 'app-doctor-consultation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-consultation-list.html',
  styleUrls: ['./doctor-consultation-list.css']
})
export class DoctorConsultationList {
  @Input() consultations: Consultation[] = [];
  selectedConsultation: Consultation | null = null;
  showPopup: boolean = false;


  viewDetails(consultation: Consultation) {
    this.selectedConsultation = consultation;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.selectedConsultation = null;
  }
}