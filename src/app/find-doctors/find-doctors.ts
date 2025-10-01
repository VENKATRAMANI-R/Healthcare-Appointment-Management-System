import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookAppointment } from '../book-appointment/book-appointment';
import { MatDialog } from '@angular/material/dialog';
import { DoctorService } from '../doctor-service';
import { Doctor } from './doctor-model';

@Component({
  selector: 'app-find-doctors',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './find-doctors.html',
  styleUrls: ['./find-doctors.css']
})
export class FindDoctors implements OnInit {
  searchQuery: string = '';
  activeFilters: Set<string> = new Set();

  doctors : Doctor []=[];
  filteredDoctors : Doctor [] = [];
  img1="";

  constructor(
    public dialog: MatDialog,
    private doctorService: DoctorService
  ) {}

  // doctors = this.doctorService.getDoctors();

  ngOnInit() {
    this.doctors = this.doctorService.getDoctors();
    this.filteredDoctors = [...this.doctors];
    this.img1 = this.doctorService.getImage();
  }

  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.searchQuery = input.value;
    this.applyFilters();
  }

  performSearch() {
    this.applyFilters();
  }

  toggleFilter(filter: string) {
    if (this.activeFilters.has(filter)) {
      this.activeFilters.delete(filter);
    } else {
      this.activeFilters.add(filter);
    }
    this.applyFilters();
  }

  openAppointmentModal(): void {
    this.dialog.open(BookAppointment, {
      width: '600px'
    });
  }

  applyFilters() {
    const query = this.searchQuery.toLowerCase();

    this.filteredDoctors = this.doctors.filter(doctor => {
      const matchesQuery =
        doctor.name.toLowerCase().includes(query) ||
        doctor.position.toLowerCase().includes(query) ||
        doctor.qualification.toLowerCase().includes(query);

      const matchesFilters =
        this.activeFilters.size === 0 ||
        Array.from(this.activeFilters).every(filter =>
          doctor.specialties.includes(filter) || doctor.availability.includes(filter)
        );

      return matchesQuery && matchesFilters;
    });
  }
}
