
import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService, Consultation } from '../../consultation.service';

@Component({
  selector: 'app-consultation-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './consultation-list.html',
  styleUrls: ['./consultation-list.css']
})
export class ConsultationList  {
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
