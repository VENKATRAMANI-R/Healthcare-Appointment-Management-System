import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ConsultationService, Consultation } from '../consultation.service';
import { ConsultationList } from './consultation-list/consultation-list';
import { ReactiveFormsModule } from '@angular/forms'
@Component({
  selector: 'app-my-consultations',
  standalone: true,
  imports: [CommonModule,FormsModule, ConsultationList,ReactiveFormsModule],
  templateUrl: './my-consultations.html',
  styleUrls: ['./my-consultations.css']
})
export class MyConsultations implements OnInit {

  consultations: Consultation[] = [];
  filteredConsultations: Consultation[] = [];

  searchTerm: string = '';

  constructor(private consultationService: ConsultationService) {}

  ngOnInit(): void {
    this.consultations = this.consultationService.getConsultations();
    this.filteredConsultations = [...this.consultations];
  }

  onSearch(event: Event): void {
  const input = (event.target as HTMLInputElement).value.trim().toLowerCase();
  this.filteredConsultations = this.consultations.filter(c =>
    c.doctorName.toLowerCase().includes(input) ||
    c.date.toLowerCase().includes(input)
  );
}

  }
