import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConsultationService, Consultation } from '../consultation.service';
import { ConsultationList } from './consultation-list/consultation-list';

@Component({
  selector: 'app-my-consultations',
  standalone: true,
  imports: [CommonModule, ConsultationList],
  templateUrl: './my-consultations.html',
  styleUrls: ['./my-consultations.css']
})
export class MyConsultations implements OnInit {

  consultations: Consultation[] = [];
  selectedConsultation: Consultation | null = null;
  showDetail = false;

  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    this.consultations = this.consultationService.getConsultations();
  }
}

